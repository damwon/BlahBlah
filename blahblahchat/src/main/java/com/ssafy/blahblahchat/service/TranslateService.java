package com.ssafy.blahblahchat.service;


import com.google.api.client.auth.oauth2.Credential;
import com.google.cloud.translate.Language;
import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;
import com.ssafy.blahblahchat.dto.SupportedLanguageTransDTO;
import com.ssafy.blahblahchat.entity.SupportedLanguageTrans;
import com.ssafy.blahblahchat.repository.TransLanguageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.google.auth.Credentials;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class TranslateService {
    Translate translate = TranslateOptions.getDefaultInstance().getService();
    private final TransLanguageRepository transLanguageRepository;

    public String translateText(String text,String targetLanguage){
        Translation translation=translate.translate(text, Translate.TranslateOption.targetLanguage(targetLanguage));
        return translation.getTranslatedText();
    }

    public List<SupportedLanguageTrans> getSupportedLanguageByTargetLanguage(String targetLanguage){
        return transLanguageRepository.findSupportedLanguageByTargetLanguage(targetLanguage);
    }

    public void initDataBase(){
        List<String> codeList=new ArrayList<>();
        List<Language> languages =
                translate.listSupportedLanguages(Translate.LanguageListOption.targetLanguage("es"));

        for(Language language:languages){
            codeList.add(language.getCode());
        }

        transLanguageRepository.initDataBase(codeList);

    }



}
