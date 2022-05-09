package com.ssafy.blahblah.api.response.member;

import com.ssafy.blahblah.api.response.notice.MyQnaListRes;
import com.ssafy.blahblah.db.entity.Qna;
import com.ssafy.blahblah.db.entity.Report;
import com.ssafy.blahblah.db.entity.User;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ReportListRes {
    private Long id;
    private String content;
    private String type;
    private String imgUrl;
    private String reporter;
    private String reportee;
    private LocalDateTime createdAt;

    public static ReportListRes fromEntity(Report report) {
        return ReportListRes.builder()
                .id(report.getId())
                .content(report.getContent())
                .type(report.getType())
                .imgUrl(report.getImgUrl())
                .reporter(report.getReporter().getName())
                .reportee(report.getReportee().getName())
                .createdAt(report.getCreatedAt())
                .build();
    }
}
