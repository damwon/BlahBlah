package com.ssafy.blahblah.api.controller.member;

import com.ssafy.blahblah.api.request.member.ReportAnsPostReq;
import com.ssafy.blahblah.api.request.member.ReportPostReq;
import com.ssafy.blahblah.api.response.member.ReportDetailRes;
import com.ssafy.blahblah.api.response.member.ReportListPageRes;
import com.ssafy.blahblah.api.service.member.UserService;
import com.ssafy.blahblah.api.service.s3.AwsS3Service;
import com.ssafy.blahblah.common.auth.SsafyUserDetails;
import com.ssafy.blahblah.db.entity.BanReason;
import com.ssafy.blahblah.db.entity.Report;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.repository.BanReasonRepository;
import com.ssafy.blahblah.db.repository.ReportRepository;
import com.ssafy.blahblah.db.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/report")
public class ReportController {

    @Autowired
    UserService userService;

    @Autowired
    AwsS3Service awsS3Service;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ReportRepository reportRepository;

    @Autowired
    BanReasonRepository banReasonRepository;

    @PostMapping("/{userId}")
    public ResponseEntity postReport(Authentication authentication, @PathVariable Long userId,
                                     @RequestPart(value="image", required = false) List<MultipartFile> multipartFile,
                                     @RequestPart(value="reportPostReq") ReportPostReq reportPostReq){
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String findUserId = userDetails.getUsername();
        User reporter = userService.getUserByEmail(findUserId);

        String img;
        if (multipartFile.get(0).isEmpty()) {
            img = null;
        }
        else {
            img = awsS3Service.uploadImage(multipartFile, "report").get(0);
        }
        Optional<User> userOptional = userRepository.findById(userId);
        if(userOptional.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        User reportee = userOptional.get();
        reportRepository.save(Report.builder()
                        .content(reportPostReq.getContent())
                        .type(reportPostReq.getType())
                        .createdAt(LocalDateTime.now())
                        .imgUrl(img)
                        .reportee(reportee)
                        .reporter(reporter)

                .build());
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity list(Authentication authentication, Pageable pageable){
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        if(user.getAuthority().equals("admin")) {
            Page<Report> reports = reportRepository.findAll(pageable);

            if (reports == null || reports.getContent().size() == 0) {
                return ResponseEntity.status(HttpStatus.OK).body(null);
            }

            return ResponseEntity.status(HttpStatus.OK).body(new ReportListPageRes(reports));

        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("관리자가 아닙니다");

    }

    @GetMapping("/{reportId}")
    public ResponseEntity detail(Authentication authentication, @PathVariable Long reportId){
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        if(user.getAuthority().equals("admin")) {
            Optional<Report> optionalReport = reportRepository.findById(reportId);
            if(optionalReport.isEmpty()) {
                return new ResponseEntity(HttpStatus.NOT_FOUND);
            }
            Report report = optionalReport.get();
            return ResponseEntity.status(HttpStatus.OK).body(new ReportDetailRes(report));

        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("관리자가 아닙니다");
    }



    @PostMapping("/admin/{reportId}")
    public ResponseEntity adminPost(Authentication authentication, @PathVariable Long reportId, @RequestBody ReportAnsPostReq reportAnsPostReq){
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        if(user.getAuthority().equals("admin")) {
            Optional<Report> optionalReport = reportRepository.findById(reportId);
            if(optionalReport.isEmpty()) {
                return new ResponseEntity(HttpStatus.NOT_FOUND);
            }

            Report report = optionalReport.get();
            User reportee = report.getReportee();
            LocalDateTime startedAt;
            if(reportee.getExpiredAt().isAfter(LocalDateTime.now())) { // 현재 정지 중이면
                reportee.setExpiredAt(reportee.getExpiredAt().plusDays(reportAnsPostReq.getDay()));
                startedAt = reportee.getExpiredAt().plusSeconds(1);
            }
            else {
                reportee.setExpiredAt(LocalDateTime.now().plusDays(reportAnsPostReq.getDay()));
                startedAt = LocalDateTime.now();
            }
            reportee.setReportedCnt(reportee.getReportedCnt()+1);
            userRepository.save(reportee);

            banReasonRepository.save(BanReason.builder()
                            .reason(reportAnsPostReq.getReason())
                            .user(reportee)
                            .createdAt(startedAt)
                            .expiredAt(reportee.getExpiredAt())
                    .build());
            return new ResponseEntity(HttpStatus.OK);

        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("관리자가 아닙니다");
    }
}
