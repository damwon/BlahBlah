package com.ssafy.blahblah.api.service.notice;

import com.ssafy.blahblah.api.request.notice.NoticeReq;
import com.ssafy.blahblah.db.entity.Notice;
import com.ssafy.blahblah.db.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

public interface NoticeService {
    Page<Notice> noticeList(Pageable pageable);

    Optional<Notice> noticeDetail(Long noticeId);

    Notice noticePost(NoticeReq noticeReq);

    ResponseEntity noticeUpdate(User user, Long noticeId, NoticeReq noticeReq);

    ResponseEntity noticeDelete(User user, Long noticeId);
}
