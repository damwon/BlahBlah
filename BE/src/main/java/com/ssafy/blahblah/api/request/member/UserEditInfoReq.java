package com.ssafy.blahblah.api.request.member;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("UserEditPutRequest")
public class UserEditInfoReq {
    @ApiModelProperty(name="유저 name", example="your_nickname")
    String name;
    @ApiModelProperty(name="유저 description", example="your_description")
    String description;
    @ApiModelProperty(name="유저 프로필이미지상태값", example="0(변경없음),1(변경있음)")
    int imgState;
}
