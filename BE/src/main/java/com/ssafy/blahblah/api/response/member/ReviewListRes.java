package com.ssafy.blahblah.api.response.member;

import com.ssafy.blahblah.db.entity.LangInfo;
import com.ssafy.blahblah.db.entity.Review;
import com.ssafy.blahblah.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ApiModel("ReviewListResponse")
public class ReviewListRes {
    @ApiModelProperty(name="유저 ID(Email)", example="ssafy_web@ssafy.com")
    String email;
    @ApiModelProperty(name="유저 name", example="your_nickname")
    String name;
    @ApiModelProperty(name="유저 id", example="12")
    Long reviewUserId;
    @ApiModelProperty(name="review한 유저 id", example="34")
    Long userId;
    @ApiModelProperty(name="리뷰 텍스트", example="이사람과의 대화가 행복해요")
    String reviewTxt;
    @ApiModelProperty(name="리뷰 생성및수정날짜", example="2022-02-04 14:07:48.206444")
    LocalDateTime createdAt;

    public ReviewListRes(Review entity) {
        this.reviewUserId = entity.getReviewUserId();
        this.userId = entity.getUserId();
        this.reviewTxt = entity.getReviewTxt();
        this.createdAt = entity.getCreatedAt();
    }
}
