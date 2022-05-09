package com.ssafy.blahblah.api.request.member;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserAuthEmailRequest")
public class UserAuthEmailReq {
    @ApiModelProperty(name="인증할 email", example="ssafy@ssafy.com")
    String email;
}
