package com.ssafy.blahblahchat.service;


import com.google.api.client.auth.oauth2.Credential;
import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;
import org.springframework.stereotype.Service;
import com.google.auth.Credentials;


@Service
public class TranslateService {
    Translate translate = TranslateOptions.newBuilder()


    public String translateText(String text){
        Translation translation=translate.translate(text);
        return translation.getTranslatedText();
    }





}
