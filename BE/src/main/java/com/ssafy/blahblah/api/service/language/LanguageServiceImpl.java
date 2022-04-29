package com.ssafy.blahblah.api.service.language;

import com.ssafy.blahblah.api.service.language.LanguageService;
import com.ssafy.blahblah.db.entity.Language;
import com.ssafy.blahblah.db.repository.LanguageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/**
 *	s3 로직 처리를 위한 서비스 구현 정의.
 */
@Service
@RequiredArgsConstructor
public class LanguageServiceImpl implements LanguageService {

	@Autowired
	LanguageRepository languageRepository;

	@Override
	public Language createLanguage(String code, String Langimg, String engName) {
		Language lang = new Language();
		lang.setCode(code);
		lang.setLangImg(Langimg);
		lang.setEngName(engName);
		return languageRepository.save(lang);
	}

	@Override
	public Language getLanguageByCode(String code) {
		return languageRepository.findByCode(code);
	}

	@Override
	public Language getLanguageByEngName(String engName) {
		return languageRepository.findByEngName(engName);
	}
}
