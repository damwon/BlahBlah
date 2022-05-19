package com.ssafy.blahblah.api.response.member;

import com.ssafy.blahblah.api.response.notice.MyQnaListRes;
import com.ssafy.blahblah.db.entity.Qna;
import com.ssafy.blahblah.db.entity.Report;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class ReportListPageRes {
    private List<ReportListRes> reportListRes;
    private int totalPages;

    public ReportListPageRes(Page<Report> reports){
        this.reportListRes= reports.stream().map(ReportListRes::fromEntity).collect(Collectors.toList());
        this.totalPages = reports.getTotalPages();
    }
}
