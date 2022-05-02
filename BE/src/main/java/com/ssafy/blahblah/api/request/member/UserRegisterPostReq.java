package com.ssafy.blahblah.api.request.member;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserRegisterPostRequest")
public class UserRegisterPostReq {
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

		@ApiModelProperty(name="언어 code & level array", example="\"list\" : [{\"code\":\"kor\", \"level\":3}, {\"code\":\"eng\", \"level\":4}, {\"code\":\"chi\", \"level\":5}]")
		ArrayList<Object> list;
}
