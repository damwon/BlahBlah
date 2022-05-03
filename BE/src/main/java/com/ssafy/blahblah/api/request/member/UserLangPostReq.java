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
public class UserLangPostReq {
	@ApiModelProperty(name="언어 code", example="kor")
	String code;
	@ApiModelProperty(name="언어 level", example="1,2,3:학습언어, 4:구사언어, 5:모국어")
	Integer level;
}
