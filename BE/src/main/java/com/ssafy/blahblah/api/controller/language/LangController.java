package com.ssafy.blahblah.api.controller.language;

import com.ssafy.blahblah.api.service.language.LanguageService;
import com.ssafy.blahblah.api.service.language.LanguageServiceImpl;
import com.ssafy.blahblah.api.service.s3.AwsS3Service;
import com.ssafy.blahblah.common.model.response.BaseResponseBody;
import com.ssafy.blahblah.db.entity.Language;
import com.ssafy.blahblah.db.repository.LanguageRepository;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * 인증 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "언어정보 API", tags = {"Language"})
@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/lang")
public class LangController {
	@Autowired
	LanguageService languageService;

	@Autowired
	LanguageServiceImpl languageServiceImpl;

	@Autowired
	LanguageRepository languageRepository;

	private final AwsS3Service awsS3Service;

	@PostMapping("/regist")
	@ApiOperation(value = "언어 등록", notes = "언어 코드, 이미지, 영문명을 등록한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 409, message = "유효하지않은 값"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> registLanguage(
			@ApiParam(value="언어 정보", required = true)
			@RequestPart(value="code",required = false) String code,
			@RequestPart(value="file",required = false) List<MultipartFile> multipartFile,
			@RequestPart(value="engName",required = false) String engName) {

		String imgString = awsS3Service.uploadImage(multipartFile, "language").get(0);

		languageService.createLanguage(code, imgString, engName);
		Language language = languageServiceImpl.getLanguageByCode(code);
		if(language == null) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "InvalidValue"));
		}
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "언어 정보 저장 성공"));
	}

	@GetMapping("/")
	@ApiOperation(value = "등록된 언어 테이블", notes = "언어 코드, 이미지, 영문명을 리스트로 반환한다")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> getLanguage() {
		List<Language> languages = languageService.getLanguageTable();
		return new ResponseEntity(languages,HttpStatus.OK);
	}
}
