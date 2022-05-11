package com.ssafy.blahblahchat.api.repository;



import com.google.cloud.translate.Language;
import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.ssafy.blahblahchat.api.dto.SupportedLanguageTransDTO;
import com.ssafy.blahblahchat.api.entity.SupportedLanguageTrans;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;


@Repository
@Log4j2
@RequiredArgsConstructor
@Transactional
public class TransLanguageRepository {
    @PersistenceContext
    EntityManager em;
    Translate translate = TranslateOptions.getDefaultInstance().getService();

    public List<SupportedLanguageTrans> findSupportedLanguageByTargetLanguage(String targetLanguageCode){
        System.out.println("TransLanguageRepository.findSupportedLanguageByTargetLanguage");
        try {
            List<SupportedLanguageTrans> langList = em.createQuery("select t from trans_supportedlanguage t where t.targetLanguageCode=:targetLanguageCode ", SupportedLanguageTrans.class)
                    .setParameter("targetLanguageCode", targetLanguageCode)
                    .getResultList();
            return langList;
        } catch (NoResultException e){
            return null;
        }
    }

    public void initDataBase(List<String> codes){
       for(String targetCode: codes){
           List<SupportedLanguageTransDTO>list = getSupportedLanguageByTargetLanguage(targetCode);
           for(SupportedLanguageTransDTO supportedLanguageTransDTO: list){
               SupportedLanguageTrans supportedLanguageTrans=SupportedLanguageTrans.builder()
                       .targetLanguageCode(supportedLanguageTransDTO.getTargetLanguageCode())
                       .label(supportedLanguageTransDTO.getName())
                       .code(supportedLanguageTransDTO.getCode())
                       .build();
               insertData(supportedLanguageTrans);
           }
       }

    }

    public void insertData(SupportedLanguageTrans supportedLanguageTrans){
        em.persist(supportedLanguageTrans);
        log.debug("inserted targetCode: {}, name: {}, code: {}",supportedLanguageTrans.getTargetLanguageCode(),supportedLanguageTrans.getLabel(),supportedLanguageTrans.getCode());
    }
    public List<SupportedLanguageTransDTO> getSupportedLanguageByTargetLanguage(String targetLanguage){
        List<Language> languages =
                translate.listSupportedLanguages(Translate.LanguageListOption.targetLanguage(targetLanguage));

        List<SupportedLanguageTransDTO> list=new ArrayList<>();

        for (Language language : languages) {
            SupportedLanguageTransDTO lan=new SupportedLanguageTransDTO(targetLanguage,language.getName(),language.getCode());
            list.add(lan);
        }

        return list;
    }
}
