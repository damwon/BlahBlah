package com.ssafy.blahblahchat.api.controller;


import com.ssafy.blahblahchat.api.service.MessageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "채팅 메시지 관련 API",tags = {"Message."})
@RestController
@RequiredArgsConstructor
@Log4j2
@CrossOrigin("*")
@RequestMapping("/api/message")
public class MessageController {


    private final MessageService messageService;

    //채팅방 히스토리 가져오기
    @GetMapping("{roomId}")
    @ApiOperation(value = "채팅방 히스토리",notes = "채팅방 히스토리 가져오기")
    @ApiResponses(
            value = {
                    @ApiResponse(code=200, message = "성공")
            }

    )
    public ResponseEntity getMessagesByRoomId(@PathVariable String roomId){
    return new ResponseEntity(messageService.findAllMessagesByRoomId(roomId), HttpStatus.OK);
    }


}
