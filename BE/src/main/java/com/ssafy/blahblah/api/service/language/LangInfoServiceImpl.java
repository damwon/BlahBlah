package com.ssafy.blahblah.api.service.language;

import com.ssafy.blahblah.db.entity.LangInfo;
import com.ssafy.blahblah.db.repository.LangInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 *	s3 로직 처리를 위한 서비스 구현 정의.
 */
@Service
@RequiredArgsConstructor
public class LangInfoServiceImpl implements LangInfoService {

	@Autowired
	LangInfoRepository langInfoRepository;

	@Override
	public LangInfo createLangInfo(Long userId, Long langId, Integer level) {
		LangInfo lang = new LangInfo();
		lang.setLevel(level);
		return langInfoRepository.save(lang);
	}

	@Override
	public LangInfo getLangInfoByUserId(Long userId) {
		return langInfoRepository.findByUserId(userId);
	}

	@Override
	public LangInfo getLangInfoByLevel(Integer level) {
		return langInfoRepository.findByLevel(level);
	}

	@Override
	public List<LangInfo> getLangInfoListByUserId(Long userId) { return langInfoRepository.findListByUserId(userId);}
}
