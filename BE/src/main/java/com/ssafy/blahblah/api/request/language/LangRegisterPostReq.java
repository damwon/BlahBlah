package com.ssafy.blahblah.api.request.language;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 언어 등록 API ([POST] /api/lang) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("LangRegisterPostRequest")
public class LangRegisterPostReq {
	@ApiModelProperty(name="언어 코드", example="KR")
	String code;
	@ApiModelProperty(name="언어 이미지", example="UUID")
	String langImg;
	@ApiModelProperty(name="영문명", example="korea")
	String engName;
}
