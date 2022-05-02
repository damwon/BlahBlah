package com.ssafy.blahblahchat.controller;

import com.google.cloud.texttospeech.v1.Voice;
import com.ssafy.blahblahchat.service.TTSService;
import com.ssafy.blahblahchat.service.TranslateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


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
