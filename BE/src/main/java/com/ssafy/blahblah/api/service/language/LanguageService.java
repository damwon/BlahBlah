package com.ssafy.blahblah.api.service.language;


import com.ssafy.blahblah.db.entity.Language;
import com.ssafy.blahblah.db.entity.User;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface LanguageService {
	Language createLanguage(String code, String Langimg, String engName);
	Language getLanguageByCode(String code);
	Language getLanguageByEngName(String engName);
}
