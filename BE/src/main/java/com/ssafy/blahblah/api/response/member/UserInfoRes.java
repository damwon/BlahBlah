package com.ssafy.blahblahchat.api.response.member;

import com.ssafy.blahblah.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("UserInfoGetResponse")
public class UserInfoRes {
    @ApiModelProperty(name="seq", example="1")
    Long id;
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
    @ApiModelProperty(name="유저 reportedCnt", example="0")
    Integer reportedCnt;
    @ApiModelProperty(name="유저 생성날짜", example="2022-02-04 14:07:48.206444")
    LocalDateTime createdAt;
    @ApiModelProperty(name="유저 정지 해제 날짜", example="2022-02-04 14:07:48.206444")
    LocalDateTime expiredAt;

    public UserInfoRes(User entity) {
        this.id = entity.getId();
        this.email = entity.getEmail();
        this.name = entity.getName();
        this.gender = entity.getGender();
        this.age = entity.getAge();
        this.description = entity.getDescription();
        this.profileImg = entity.getProfileImg();
        this.reportedCnt = entity.getReportedCnt();
        this.createdAt = entity.getCreatedAt();
        this.expiredAt = entity.getExpiredAt();
    }
}
