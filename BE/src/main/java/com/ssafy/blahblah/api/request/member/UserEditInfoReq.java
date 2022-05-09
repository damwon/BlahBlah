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
    @ApiModelProperty(name="유저 profileImg", example="your_profileImg")
    String profileImg;
}
