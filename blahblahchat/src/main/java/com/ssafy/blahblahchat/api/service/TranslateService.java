package com.ssafy.blahblahchat.api.service;


import com.google.cloud.translate.Language;
import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;
import com.ssafy.blahblahchat.api.entity.SupportedLanguageTrans;
import com.ssafy.blahblahchat.api.repository.TransLanguageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class TranslateService {
    Translate translate = TranslateOptions.getDefaultInstance().getService();
    private final TransLanguageRepository transLanguageRepository;

    public String translateText(String text,String targetLanguage){
        Translation translation=translate.translate(text, Translate.TranslateOption.targetLanguage(targetLanguage));
        String tmpText=translation.getTranslatedText();
        tmpText=tmpText.replaceAll("&#39;","'");
        return tmpText;
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
