package com.ssafy.blahblahchat.api.controller;

import com.ssafy.blahblahchat.api.service.TTSService;
import com.ssafy.blahblahchat.api.service.TranslateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@Log4j2
@RequiredArgsConstructor
public class TTSController {
    private final TranslateService translateService;
    private final TTSService ttsService;

    @GetMapping("/api/tts-list")
    public String getAvailableList() throws Exception {
        ttsService.listAllSupportedVoices();
        return "HI";

    }



}
