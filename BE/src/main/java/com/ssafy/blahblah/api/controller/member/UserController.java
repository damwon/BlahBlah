package com.ssafy.blahblah.api.controller.member;

import com.ssafy.blahblah.api.request.member.*;
import com.ssafy.blahblah.api.response.member.UserInfoRes;
import com.ssafy.blahblah.api.service.language.LangInfoService;
import com.ssafy.blahblah.api.service.language.LanguageService;
import com.ssafy.blahblah.api.service.member.EmailService;
import com.ssafy.blahblah.api.service.member.UserService;
import com.ssafy.blahblah.common.auth.SsafyUserDetails;
import com.ssafy.blahblah.common.model.response.BaseResponseBody;
import com.ssafy.blahblah.common.util.RedisUtil;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.repository.UserRepository;
import io.swagger.annotations.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import springfox.documentation.annotations.ApiIgnore;

import java.util.*;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@CrossOrigin("*")
@RequestMapping("/api/user")
public class UserController {

	private final UserService userService;

	private final UserRepository userRepository;

	private final PasswordEncoder passwordEncoder;

	private final EmailService emailService;

	private final RedisUtil redisUtil;

	private final LanguageService languageService;

	private final LangInfoService langInfoService;

	public UserController(UserService userService, UserRepository userRepository, PasswordEncoder passwordEncoder, EmailService emailService, RedisUtil redisUtil, LanguageService languageService, LangInfoService langInfoService) {
		this.userService = userService;
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.emailService = emailService;
		this.redisUtil = redisUtil;
		this.languageService = languageService;
		this.langInfoService = langInfoService;
	}

	@GetMapping("/")
	@ApiOperation(value = "등록된 유저 테이블", notes = "유저 정보를 리스트로 반환한다")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity getUser() {
		List<User> users = userService.getUserTable();
		return new ResponseEntity(users,HttpStatus.OK);
	}


	@PostMapping("/signup")
	@ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 409, message = "유효하지않은 값"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> signup(
			@ApiParam(value="회원가입 정보", required = true)
			@RequestBody UserRegisterPostReq registerInfo) {

		System.out.println(registerInfo.getList());
		Object langInfo = registerInfo.getList().get(0);
		System.out.println(langInfo);
//		System.out.println(langInfo.);
		UserInfoPostReq userInfoPostReq = new UserInfoPostReq();
		userInfoPostReq.setEmail(registerInfo.getEmail());
		userInfoPostReq.setName(registerInfo.getName());
		userInfoPostReq.setGender(registerInfo.getGender());
		userInfoPostReq.setAge(registerInfo.getAge());
		userInfoPostReq.setDescription(registerInfo.getDescription());
		userInfoPostReq.setProfileImg(registerInfo.getProfileImg());
		userInfoPostReq.setPassword(registerInfo.getPassword());

		User user = userService.createUser(userInfoPostReq);
//
//		ArrayList list = registerInfo.getList();
//		int listSize = list.size();
//		if(user == null) {
//			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "InvalidValue"));
//		} else {
//			long userId = user.getId();
//			for (int i=0; i<listSize; i++) {
//				long langId = languageService.getLanguageByCode(list.get(i).get("code"));
//			}
//			String code = userLangPostReq.getCode();
//			long langId = languageService.getLanguageByCode(code).getId();
//			Integer level = userLangPostReq.getLevel();
//			LangInfo lang = langInfoService.createLangInfo(userId, langId, level);
//		}

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	@ApiOperation(value = "인증 메일 전송", notes = "회원가입 하려는 사용자에게 인증 메일을 전송한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@PostMapping("/checkemail")
	public ResponseEntity checkEmail(@RequestBody @ApiParam(value="유저 아이디(이메일)", required = true) @RequestPart(value="email",required = false) String userEmail) {
		UUID uuid = UUID.randomUUID();
		redisUtil.setDataExpire(uuid.toString(), userEmail, 60 * 30L);
		String CHECK_EMAIL_LINK = "https://blahblah.community/checkemail/";
		emailService.sendMail(userEmail,"사용자 인증 메일",CHECK_EMAIL_LINK+uuid.toString());
		return new ResponseEntity(HttpStatus.OK);
	}

	@ApiOperation(value = "이메일 인증 완료", notes = "사용자가 인증 메일을 확인한지 체크한다")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@GetMapping("/authemail/{key}")
	public ResponseEntity authEmail(@ApiParam(value="인증 key값", required = true) @PathVariable String key) {
		String email = redisUtil.getData(key);

		if (email == null) {
			return new ResponseEntity<>("email-auth-error",HttpStatus.NOT_FOUND);
		}
		else {
			return new ResponseEntity<>(email, HttpStatus.OK);
		}
	}

	@GetMapping("/me")
	@ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "엑세스 토큰의 값이 틀림"),
			@ApiResponse(code = 403, message = "엑세스 토큰이 없이 요청"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity getUserInfo(@ApiIgnore Authentication authentication) {
		/**
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
		 * 엑세스 토큰이 잘못된 경우 401 에러({"error" : "SignatureVerificationException", :"message: " The Token's Signature resulted invalid when verified using the Algorithm: HmacSHA512"}) 발생
		 */
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String email = userDetails.getUsername();
		User user = userService.getUserByEmail(email);
		UserInfoRes userInfoRes = new UserInfoRes(user);

		return new ResponseEntity<>(userInfoRes,HttpStatus.OK);
	}

	@ApiOperation(value = "회원 본인 정보 수정", notes = "로그인한 회원 본인의 정보 중 닉네임과 이메일을 수정한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "엑세스 토큰 값이 틀림"),
			@ApiResponse(code = 403, message = "엑세스 토큰이 없이 요청"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@PutMapping("/edit")
	public ResponseEntity editUserInfo(
			@ApiIgnore Authentication authentication,
			@ApiParam(value="회원정보 수정 데이터", required = true)
			@RequestBody UserEditInfoReq userEditPutReq) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String email = userDetails.getUsername();
		User user = userService.getUserByEmail(email);
		user.setName(userEditPutReq.getName());
		user.setDescription(userEditPutReq.getDescription());
		user.setProfileImg(userEditPutReq.getProfileImg());
		userRepository.save(user);
		return new ResponseEntity(HttpStatus.OK);
	}

	@ApiOperation(value = "비밀번호 수정", notes = "로그인한 회원 본인의 정보 중 비밀번호를 수정한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "엑세스 토큰 값이 틀림"),
			@ApiResponse(code = 403, message = "엑세스 토큰이 없이 요청"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@PutMapping("/edit-password")
	public ResponseEntity editPassword(
			@ApiIgnore Authentication authentication,
			@ApiParam(value="새로운 비밀번호", required = true)
			@RequestBody UserEditPwReq userEditPasswordReq) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String email = userDetails.getUsername();
		User user = userService.getUserByEmail(email);
		user.setPassword(passwordEncoder.encode(userEditPasswordReq.getPassword()));
		userRepository.save(user);
		return new ResponseEntity(HttpStatus.OK);
	}


	@ApiOperation(value = "비밀번호 찾기 안내 메일 전송", notes = "비밀번호를 잊은 사용자에게 비밀번호 찾기 안내 메일을 전송한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 404, message = "사용자를 찾을 수 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@PostMapping("/find-password")
	public ResponseEntity findPassword(@RequestBody @ApiParam(value="유저 확인용 정보", required = true) UserFindPwReq userFindPwReq) {

		String email  = userFindPwReq.getEmail();
		Optional<User> user_tmp = userRepository.findByEmail(email);
		if (user_tmp.isEmpty()) {
			return new ResponseEntity<>("id-error",HttpStatus.NOT_FOUND);
		}
		else {
			User user = user_tmp.get();
			if (user.getEmail().equals(userFindPwReq.getEmail())) {
				UUID uuid = UUID.randomUUID();
				redisUtil.setDataExpire(uuid.toString(),user.getEmail(), 60 * 30L);
				String CHANGE_PASSWORD_LINK = "https://blahblah.community/find-password/";
				emailService.sendMail(user.getEmail(),"사용자 비밀번호 안내 메일",CHANGE_PASSWORD_LINK+uuid.toString());
				return new ResponseEntity(HttpStatus.OK);
			} else {
				return new ResponseEntity<>("email-error",HttpStatus.NOT_FOUND);
			}
		}
	}

	@ApiOperation(value = "비밀번호 찾기 후 수정", notes = "비밀번호를 잊은 사용자가 이메일 인증을 통해 비밀번호를 변경한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "엑세스 토큰 값이 틀림"),
			@ApiResponse(code = 403, message = "엑세스 토큰이 없이 요청"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@ApiImplicitParam(name="key", value = "UUID", required = true)
	@PutMapping("/password/{key}")
	public ResponseEntity changePassword(
			@PathVariable String key,
			@ApiParam(value="유저의 새로운 비밀번호", required = true)
			@RequestBody UserChangePwReq userChangePwReq){
		String email = redisUtil.getData(key);
		User user = userService.getUserByEmail(email);
		user.setPassword(passwordEncoder.encode(userChangePwReq.getPassword()));
		userRepository.save(user);
		return new ResponseEntity(HttpStatus.OK);
	}

	@ApiOperation(value = "이메일 중복 체크", notes = "중복되는 이메일이 있는 지 체크한다")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code=409, message = "중복되는 이메일 존재"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@PostMapping("/signup/duplicate-check-email")
	public ResponseEntity duplicateCheckId(@RequestBody @ApiParam(value="체크할 이메일", required = true) Map<String,Object> body) {
		String email  = body.get("email").toString();
		Optional<User> user = userRepository.findByEmail(email);

		if (user.isPresent()) {
			return new ResponseEntity(HttpStatus.CONFLICT);
		}
		else {
			return new ResponseEntity(HttpStatus.OK);
		}
	}

	@ApiOperation(value = "권한 조회", notes = "현재 로그인한 사용자의 권한을 조회한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "엑세스 토큰 값이 틀림"),
			@ApiResponse(code = 403, message = "엑세스 토큰이 없이 요청"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@GetMapping("/check-authority")
	public String checkAuthority(@ApiIgnore Authentication authentication) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String email = userDetails.getUsername();
		User user = userService.getUserByEmail(email);
		if (user.getAuthority().equals("user")) {
			return "user";
		} else {
			return "admin";
		}
	}
}
