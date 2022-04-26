package com.ssafy.blahblah.api.controller.language;

import com.ssafy.blahblah.api.request.member.UserLoginPostReq;
import com.ssafy.blahblah.api.request.member.UserRegisterPostReq;
import com.ssafy.blahblah.api.response.member.UserLoginPostRes;
import com.ssafy.blahblah.api.service.member.UserService;
import com.ssafy.blahblah.common.model.response.BaseResponseBody;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.repository.UserRepository;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * 인증 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "언어정보 API", tags = {"Language"})
@RestController
@CrossOrigin("*")
@RequestMapping("/api/lang")
public class LangController {
	@Autowired
	UserService userService;

	@Autowired
	UserRepository userRepository;

	@PostMapping("/regist")
	@ApiOperation(value = "언어 등록", notes = "언어 코드, 이미지, 영문명을 등록한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 409, message = "유효하지않은 값"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> regist(
			@ApiParam(value="언어 정보", required = true)
			@RequestBody UserRegisterPostReq registerInfo) {

		User user = userService.createUser(registerInfo);
		if(user == null) {
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "InvalidValue"));
		}
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}
}
