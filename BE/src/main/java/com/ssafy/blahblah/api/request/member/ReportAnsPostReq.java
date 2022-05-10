package com.ssafy.blahblah.api.request.member;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReportAnsPostReq {
    int day;
    String reason;
}
