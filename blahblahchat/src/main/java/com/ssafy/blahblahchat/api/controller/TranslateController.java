package com.ssafy.blahblahchat.api.controller;

import com.ssafy.blahblahchat.api.dto.TransDTO;
import com.ssafy.blahblahchat.api.entity.SupportedLanguageTrans;
import com.ssafy.blahblahchat.api.service.TranslateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Log4j2
@RequiredArgsConstructor
public class TranslateController {

    private final TranslateService translateService;

    @PostMapping("/api/trans")
    public String trans(@RequestBody TransDTO transDTO){
        return translateService.translateText(transDTO.getText(),transDTO.getTargetLanguage());
    }

    @GetMapping("/api/supportedLanguage/{targetLan}")
    public List<SupportedLanguageTrans> getSupportedLanguage(@PathVariable String targetLan){
        return translateService.getSupportedLanguageByTargetLanguage(targetLan);
    }

    @GetMapping("/api/supportedLanguage/initDB")
    public String getSupportedLanguage(){
        translateService.initDataBase();
        return "success";
    }

}
