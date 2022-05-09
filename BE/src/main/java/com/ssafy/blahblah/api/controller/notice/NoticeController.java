package com.ssafy.blahblah.api.controller.notice;
import com.ssafy.blahblah.api.request.notice.NoticeReq;
import com.ssafy.blahblah.api.response.notice.NoticeDetailRes;
import com.ssafy.blahblah.api.response.notice.NoticeListPageRes;
import com.ssafy.blahblah.api.service.member.UserService;
import com.ssafy.blahblah.api.service.notice.NoticeService;
import com.ssafy.blahblah.common.auth.SsafyUserDetails;
import com.ssafy.blahblah.db.entity.Notice;
import com.ssafy.blahblah.db.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/notice")
public class NoticeController {

    @Autowired
    UserService userService;


    @Autowired
    NoticeService noticeService;

    @GetMapping
    public ResponseEntity noticeList(Pageable pageable) {
        Page<Notice> noticeList = noticeService.noticeList(pageable);
        if (noticeList == null || noticeList.getContent().size() == 0) {
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(new NoticeListPageRes(noticeList));
    }

    @GetMapping("/{noticeId}")
    public ResponseEntity noticeDetail(@PathVariable Long noticeId) {
        Optional<Notice> option = noticeService.noticeDetail(noticeId);
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
            noticeService.noticePost(noticeReq);
            return new ResponseEntity(HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("관리자가 아닙니다");

    }

    @PutMapping("/{noticeId}")
    public ResponseEntity noticeUpdate(Authentication authentication, @PathVariable Long noticeId, @RequestBody NoticeReq noticeReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        return noticeService.noticeUpdate(user,noticeId,noticeReq);

    }


    @DeleteMapping("/{noticeId}")
    public ResponseEntity noticeDelete(Authentication authentication, @PathVariable Long noticeId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        return noticeService.noticeDelete(user,noticeId);
    }

}
