package com.ssafy.blahblah.api.service.member;

import com.ssafy.blahblah.api.request.member.ReportAnsPostReq;
import com.ssafy.blahblah.api.request.member.ReportPostReq;
import com.ssafy.blahblah.db.entity.BanReason;
import com.ssafy.blahblah.db.entity.Report;
import com.ssafy.blahblah.db.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.Optional;

public interface ReportService {
    Report save(ReportPostReq reportPostReq, String img, User reporter, User reportee);

    Page<Report> findAll(Pageable pageable);

    Optional<Report> findById(Long reportId);

    BanReason saveBanReason(ReportAnsPostReq reportAnsPostReq, User reportee, LocalDateTime startedAt);

    User saveReportee(User reportee);
}
