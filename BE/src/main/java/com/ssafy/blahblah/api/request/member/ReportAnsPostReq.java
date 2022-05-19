package com.ssafy.blahblah.api.request.member;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ReportAnsPostRequest")
public class ReportAnsPostReq {
    int day;
    String reason;
}
