package com.ssafy.blahblah.api.request.member;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ReportPostRequest")
public class ReportPostReq {
    @ApiModelProperty(name="신고 title", example="욕설 신고입니다.")
    String title;
    @ApiModelProperty(name="신고 내용", example="공부하다가 저한테 욕했어요")
    String content;
    @ApiModelProperty(name="신고 타입", example="욕설, 비방")
    String type;

}
