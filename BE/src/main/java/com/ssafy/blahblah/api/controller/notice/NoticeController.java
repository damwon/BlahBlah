package com.ssafy.blahblah.api.controller.notice;
import com.ssafy.blahblah.api.request.notice.NoticeReq;
import com.ssafy.blahblah.api.response.notice.NoticeDetailRes;
import com.ssafy.blahblah.api.response.notice.NoticeListRes;
import com.ssafy.blahblah.api.service.member.UserService;
import com.ssafy.blahblah.common.auth.SsafyUserDetails;
import com.ssafy.blahblah.db.entity.Notice;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.repository.NoticeRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/notice")
public class NoticeController {

    @Autowired
    UserService userService;

    @Autowired
    NoticeRepository noticeRepository;

    @GetMapping
    public ResponseEntity noticeList(Pageable pageable) {
        List<Notice> noticeList = noticeRepository.findAll(pageable).getContent();
        if (noticeList == null || noticeList.size() == 0) {
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
        List<NoticeListRes> dto = noticeList.stream().map(NoticeListRes::fromEntity).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @GetMapping("/{noticeId}")
    public ResponseEntity noticeDetail(@PathVariable Long noticeId) {
        Optional<Notice> option = noticeRepository.findById(noticeId);
        if (option.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Notice notice = option.get();
        return ResponseEntity.status(HttpStatus.OK).body(new NoticeDetailRes(notice));

    }

    @PostMapping
    public ResponseEntity noticePost(Authentication authentication, @RequestBody NoticeReq noticeReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        if(user.getAuthority().equals("admin")) {
            noticeRepository.save(Notice.builder()
                    .title(noticeReq.getTitle())
                    .content(noticeReq.getContent())
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build());
            return new ResponseEntity(HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("관리자가 아닙니다");

    }

    @PutMapping("/{noticeId}")
    public ResponseEntity noticeUpdate(Authentication authentication, @PathVariable Long noticeId, @RequestBody NoticeReq noticeReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        if(user.getAuthority().equals("admin")) {
            Optional<Notice> option = noticeRepository.findById(noticeId);
            if (option.isEmpty()) {
                return new ResponseEntity(HttpStatus.NOT_FOUND);
            }
            Notice notice = option.get();
            notice.setTitle(noticeReq.getTitle());
            notice.setContent(noticeReq.getContent());
            notice.setUpdatedAt(LocalDateTime.now());
            noticeRepository.save(notice);
            return new ResponseEntity(HttpStatus.OK);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("관리자가 아닙니다");

    }


    @DeleteMapping("/{noticeId}")
    public ResponseEntity noticeDelete(Authentication authentication, @PathVariable Long noticeId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        if(user.getAuthority().equals("admin")) {
            noticeRepository.deleteById(noticeId);
            return new ResponseEntity(HttpStatus.OK);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("관리자가 아닙니다");

    }

}
