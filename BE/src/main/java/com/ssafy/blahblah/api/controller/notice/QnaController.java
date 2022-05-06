package com.ssafy.blahblah.api.controller.notice;

import com.ssafy.blahblah.api.request.notice.MyQnaReq;
import com.ssafy.blahblah.api.request.notice.QnaAnswerReq;
import com.ssafy.blahblah.api.response.notice.MyQnaDetailRes;
import com.ssafy.blahblah.api.response.notice.MyQnaListPageRes;
import com.ssafy.blahblah.api.service.member.UserService;
import com.ssafy.blahblah.api.service.notice.QnaService;
import com.ssafy.blahblah.api.service.s3.AwsS3Service;
import com.ssafy.blahblah.common.auth.SsafyUserDetails;
import com.ssafy.blahblah.db.entity.Qna;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.repository.QnaRepository;
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
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/qna")
public class QnaController {

    @Autowired
    UserService userService;

    @Autowired
    QnaRepository qnaRepository;

    @Autowired
    AwsS3Service awsS3Service;

    @Autowired
    QnaService qnaService;

    @GetMapping
    public ResponseEntity myQnaList(Authentication authentication, Pageable pageable) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        Page<Qna> qnaList = qnaService.myQnaList(user,pageable);
        if (qnaList == null || qnaList.getContent().size() == 0) {
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(new MyQnaListPageRes(qnaList));

    }

    @GetMapping("/{qnaId}")
    public ResponseEntity myQnaDetail(Authentication authentication, @PathVariable Long qnaId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        return qnaService.myQnaDetail(user,qnaId);
    }


    @PostMapping
    public ResponseEntity myQnaPost(Authentication authentication, @RequestBody MyQnaReq qnaReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        qnaService.myQnaPost(user,qnaReq);
        return new ResponseEntity(HttpStatus.OK);

    }

    // user 사용하기
    @DeleteMapping("/{qnaId}")
    public ResponseEntity myQnaDelete(Authentication authentication, @PathVariable Long qnaId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        return qnaService.myQnaDelete(user,qnaId);
    }

    @GetMapping("/admin")
    public ResponseEntity qnaList(Authentication authentication, Pageable pageable) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        if (user.getAuthority().equals("admin")) {
            Page<Qna> qnaList = qnaService.qnaList(pageable);
            if (qnaList == null || qnaList.getContent().size() == 0) {
                return ResponseEntity.status(HttpStatus.OK).body(null);
            }
            return ResponseEntity.status(HttpStatus.OK).body(new MyQnaListPageRes(qnaList));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("관리자가 아닙니다");
    }

    @GetMapping("admin/{qnaId}")
    public ResponseEntity qnaDetail(Authentication authentication, @PathVariable Long qnaId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        if (user.getAuthority().equals("admin")) {
            Optional<Qna> option = qnaService.qnaDetail(qnaId);
            if (option.isEmpty()) {
                return new ResponseEntity(HttpStatus.NOT_FOUND);
            }
            Qna qna = option.get();
            return ResponseEntity.status(HttpStatus.OK).body(new MyQnaDetailRes(qna));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("관리자가 아닙니다");
    }

    @PostMapping("/admin/{qnaId}")
    public ResponseEntity answer(Authentication authentication, @PathVariable long qnaId, @RequestBody QnaAnswerReq qnaAnswerReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        if(user.getAuthority().equals("admin")) {
            Optional<Qna> option = qnaService.qnaDetail(qnaId);
            if (option.isEmpty()) {
                return new ResponseEntity(HttpStatus.NOT_FOUND);
            }
            Qna qna = option.get();
            qnaService.answer(qna,qnaAnswerReq);
            return new ResponseEntity<>(HttpStatus.OK);

        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("관리자가 아닙니다");
    }

    @PutMapping("admin/{qnaId}")
    public ResponseEntity answerDelete(Authentication authentication,@PathVariable Long qnaId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        if(user.getAuthority().equals("admin")) {
            Optional<Qna> option = qnaService.qnaDetail(qnaId);
            if (option.isEmpty()) {
                return new ResponseEntity(HttpStatus.NOT_FOUND);
            }
            Qna qna = option.get();
            qnaService.answerDelete(qna);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("관리자가 아닙니다");
    }









}
