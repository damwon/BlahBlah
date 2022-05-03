package com.ssafy.blahblah.api.service.language;


import com.ssafy.blahblah.db.entity.LangInfo;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface LangInfoService {
	LangInfo createLangInfo(Long userId, Long langId, Integer level);
	LangInfo getLangInfoByUserId(Long userId);
	LangInfo getLangInfoByLevel(Integer level);
}
