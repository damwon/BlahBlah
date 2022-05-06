package com.ssafy.blahblah.api.service.notice;

import com.ssafy.blahblah.api.request.notice.NoticeReq;
import com.ssafy.blahblah.db.entity.Notice;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class NoticeServiceImpl implements NoticeService{

    @Autowired
    NoticeRepository noticeRepository;

    @Override
    public Page<Notice> noticeList(Pageable pageable) {
        Page<Notice> noticeList = noticeRepository.findAll(pageable);
        return noticeList;
    }

    @Override
    public Optional<Notice> noticeDetail(Long noticeId) {
        return noticeRepository.findById(noticeId);

    }

    @Override
    public Notice noticePost(NoticeReq noticeReq) {
        return noticeRepository.save(Notice.builder()
                .title(noticeReq.getTitle())
                .content(noticeReq.getContent())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build());
    }

    @Override
    public ResponseEntity noticeUpdate(User user, Long noticeId, NoticeReq noticeReq){
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

    @Override
    public ResponseEntity noticeDelete(User user, Long noticeId) {
        if(user.getAuthority().equals("admin")) {
            noticeRepository.deleteById(noticeId);
            return new ResponseEntity(HttpStatus.OK);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("관리자가 아닙니다");
    }
}
