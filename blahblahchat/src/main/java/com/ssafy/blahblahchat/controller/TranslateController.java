package com.ssafy.blahblahchat.controller;


import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;
import com.ssafy.blahblahchat.service.TranslateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api")
public class TranslateController {

    private final TranslateService translateService;

    @GetMapping("/trans")
    public String trans(@RequestParam String text){

        translateService.translateText(text);
        return "aa";
    }

}
