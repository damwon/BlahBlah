package com.ssafy.blahblah.api.response.member;

import com.ssafy.blahblah.db.entity.Report;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReportDetailRes {
    private Long id;
    private String content;
    private String type;
    private String imgUrl;
    private String reporter;
    private String reportee;
    private LocalDateTime createdAt;

    public ReportDetailRes(Report report){
        this.id = report.getId();
        this.content = report.getContent();
        this.type = report.getType();
        this.imgUrl = report.getImgUrl();
        this.reportee = report.getReportee().getName();
        this.reporter = report.getReporter().getName();
        this.createdAt = report.getCreatedAt();
    }
}
