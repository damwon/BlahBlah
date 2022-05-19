package com.ssafy.blahblah.api.request.member;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserLangPostRequest")
public class UserInfoPostReq {
	@ApiModelProperty(name="유저 ID(Email)", example="ssafy_web@ssafy.com")
	String email;
	@ApiModelProperty(name="유저 name", example="your_nickname")
	String name;
	@ApiModelProperty(name="유저 gender", example="남(0), 여(1)")
	Integer gender;
	@ApiModelProperty(name="유저 age", example="29")
	Integer age;
	@ApiModelProperty(name="유저 description", example="your_description")
	String description;
	@ApiModelProperty(name="유저 profileImg", example="your_profileImg")
	String profileImg;
	@ApiModelProperty(name="유저 Password", example="your_password")
	String password;

	Integer reportedCnt;
}
