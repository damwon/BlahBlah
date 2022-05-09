package com.ssafy.blahblah.api.request.member;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserFindPasswordRequest")
public class UserFindPwReq {
    @ApiModelProperty(name="유저 Email", example="ssafy@naver.com")
    String email;
}
