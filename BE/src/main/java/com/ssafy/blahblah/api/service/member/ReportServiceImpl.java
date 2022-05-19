package com.ssafy.blahblah.api.service.member;

import com.ssafy.blahblah.api.request.member.ReportAnsPostReq;
import com.ssafy.blahblah.api.request.member.ReportPostReq;
import com.ssafy.blahblah.db.entity.BanReason;
import com.ssafy.blahblah.db.entity.Report;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.repository.BanReasonRepository;
import com.ssafy.blahblah.db.repository.ReportRepository;
import com.ssafy.blahblah.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ReportServiceImpl implements ReportService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    ReportRepository reportRepository;

    @Autowired
    BanReasonRepository banReasonRepository;

    @Override
    public Report save(ReportPostReq reportPostReq, String img, User reporter, User reportee){
        return reportRepository.save(Report.builder()
                .content(reportPostReq.getContent())
                .type(reportPostReq.getType())
                .createdAt(LocalDateTime.now())
                .imgUrl(img)
                .reportee(reportee)
                .reporter(reporter)

                .build());
    }

    @Override
    public Page<Report> findAll(Pageable pageable){
        return reportRepository.findAll(pageable);
    }

    @Override
    public Optional<Report> findById(Long reportId){
        return reportRepository.findById(reportId);
    }

    @Override
    public BanReason saveBanReason(ReportAnsPostReq reportAnsPostReq, User reportee, LocalDateTime startedAt){
        return banReasonRepository.save(BanReason.builder()
                .reason(reportAnsPostReq.getReason())
                .user(reportee)
                .createdAt(startedAt)
                .expiredAt(reportee.getExpiredAt())
                .build());
    }

    @Override
    public User saveReportee(User reportee){
        return userRepository.save(reportee);
    }
}
