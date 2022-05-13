package com.ssafy.blahblahchat.api.controller;

import com.ssafy.blahblahchat.api.dto.TransDTO;
import com.ssafy.blahblahchat.api.service.TranslateService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Api(value = "번역 기능 관련 API",tags = {"Trans."})
@RestController
@Log4j2
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/trans")
public class TranslateController {

    private final TranslateService translateService;

    @PostMapping()
    @ApiOperation(value = "채팅 번역",notes = "채팅을 번역해준다.")
    @ApiResponses(
            value = {
                    @ApiResponse(code=200, message = "성공")
            }
    )
    public ResponseEntity trans(@RequestBody TransDTO transDTO){
        return new ResponseEntity(translateService.translateText(transDTO.getText(),transDTO.getTargetLanguage()), HttpStatus.OK);
    }

    @GetMapping("/{targetLan}")
    @ApiOperation(value = "번역 언어",notes = "번역 가능한 언어 리스트 반환")
    @ApiResponses(
            value = {
                    @ApiResponse(code=200, message = "성공")
            }
    )
    public ResponseEntity getSupportedLanguage(@PathVariable String targetLan){
        return new ResponseEntity(translateService.getSupportedLanguageByTargetLanguage(targetLan),HttpStatus.OK);
    }

    //지원하는 언어를 DB에 넣음
//    @GetMapping("/api/supportedLanguage/initDB")
//    public String getSupportedLanguage(){
//        translateService.initDataBase();
//        return "success";
//    }

}
