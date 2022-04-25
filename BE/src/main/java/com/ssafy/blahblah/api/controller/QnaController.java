package com.ssafy.blahblah.api.controller;

import com.ssafy.blahblah.api.request.MyQnaReq;
import com.ssafy.blahblah.api.request.QnaAnswerReq;
import com.ssafy.blahblah.api.response.MyQnaDetailRes;
import com.ssafy.blahblah.api.response.MyQnaListRes;
import com.ssafy.blahblah.api.service.member.UserService;
import com.ssafy.blahblah.common.auth.SsafyUserDetails;
import com.ssafy.blahblah.db.entity.Qna;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.repository.QnaRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("api/v1/qna")
public class QnaController {

    @Autowired
    UserService userService;

    @Autowired
    QnaRepository qnaRepository;

    @GetMapping
    public ResponseEntity myQnaList(Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        List<Qna> qnaList = qnaRepository.findByUser(user);
        if (qnaList == null || qnaList.size() == 0) {
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
        List<MyQnaListRes> dto = qnaList.stream().map(MyQnaListRes::fromEntity).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(dto);

    }

    @GetMapping("/{qnaId}")
    public ResponseEntity myQnaDetail(Authentication authentication, @PathVariable Long qnaId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        Optional<Qna> option = qnaRepository.findById(qnaId);
        if (option.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Qna qna = option.get();
        if (qna.getUser().equals(user)) {
            return ResponseEntity.status(HttpStatus.OK).body(new MyQnaDetailRes(qna));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("자신이 작성한 1:1 문의가 아닙니다.");
    }

//    이미지 업로드 하기!
    @PostMapping
    public ResponseEntity myQnaPost(Authentication authentication, @RequestBody MyQnaReq qnaReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        qnaRepository.save(Qna.builder()
                .title(qnaReq.getTitle())
                .content(qnaReq.getContent())
                .createdAt(LocalDateTime.now())
                .user(user)
                .ansCheck(0)
                .build());
        return new ResponseEntity(HttpStatus.OK);

    }

    @DeleteMapping("/{qnaId}")
    public ResponseEntity myQnaDelete(Authentication authentication, @PathVariable Long qnaId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        qnaRepository.deleteById(qnaId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/admin")
    public ResponseEntity qnaList(Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        if (user.getAuthority().equals("admin")) {
            List<Qna> qnaList = qnaRepository.findAll();
            if (qnaList == null || qnaList.size() == 0) {
                return ResponseEntity.status(HttpStatus.OK).body(null);
            }
            List<MyQnaListRes> dto = qnaList.stream().map(MyQnaListRes::fromEntity).collect(Collectors.toList());
            return ResponseEntity.status(HttpStatus.OK).body(dto);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("관리자가 아닙니다");
    }

    @GetMapping("admin/{qnaId}")
    public ResponseEntity qnaDetail(Authentication authentication, @PathVariable Long qnaId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        if (user.getAuthority().equals("admin")) {
            Optional<Qna> option = qnaRepository.findById(qnaId);
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
            Optional<Qna> option = qnaRepository.findById(qnaId);
            if (option.isEmpty()) {
                return new ResponseEntity(HttpStatus.NOT_FOUND);
            }
            Qna qna = option.get();
            qna.setAnswer(qnaAnswerReq.getAnswer());
            qna.setAnsCheck(1);
            qnaRepository.save(qna);

        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("관리자가 아닙니다");
    }

    @DeleteMapping("admin/{qnaId}")
    public ResponseEntity answerDelete(Authentication authentication,@PathVariable Long qnaId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        if(user.getAuthority().equals("admin")) {
            Optional<Qna> option = qnaRepository.findById(qnaId);
            if (option.isEmpty()) {
                return new ResponseEntity(HttpStatus.NOT_FOUND);
            }
            Qna qna = option.get();
            qna.setAnswer(null);
            qna.setAnsCheck(0);
            qnaRepository.save(qna);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("관리자가 아닙니다");
    }









}
