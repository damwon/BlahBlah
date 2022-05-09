package com.ssafy.blahblah.api.service.notice;

import com.ssafy.blahblah.api.request.notice.MyQnaReq;
import com.ssafy.blahblah.api.request.notice.QnaAnswerReq;
import com.ssafy.blahblah.api.response.notice.MyQnaDetailRes;
import com.ssafy.blahblah.api.service.member.UserService;
import com.ssafy.blahblah.db.entity.Qna;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.repository.QnaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class QnaServiceImpl implements QnaService{

    @Autowired
    UserService userService;

    @Autowired
    QnaRepository qnaRepository;

    @Override
    public Page<Qna> myQnaList(User user, Pageable pageable){
        return qnaRepository.findByUser(user,pageable);

    }

    @Override
    public ResponseEntity myQnaDetail(User user, Long qnaId){
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

    @Override
    public Qna myQnaPost(User user, MyQnaReq qnaReq) {
        return qnaRepository.save(Qna.builder()
                .title(qnaReq.getTitle())
//                .imgUrl(imgString)
                .content(qnaReq.getContent())
                .createdAt(LocalDateTime.now())
                .user(user)
                .ansCheck(0)
                .build());
    }

    @Override
    public ResponseEntity myQnaDelete(User user, Long qnaId){
        Optional<Qna> qnaOptional = qnaRepository.findById(qnaId);
        if(qnaOptional.isEmpty()){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Qna qna = qnaOptional.get();
        if(qna.getUser().equals(user)){
            qnaRepository.deleteById(qnaId);
            return new ResponseEntity(HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("자신이 작성한 1:1 문의가 아닙니다.");

    }

    @Override
    public Page<Qna> qnaList(Pageable pageable) {
        return qnaRepository.findAll(pageable);
    }

    @Override
    public Optional<Qna> qnaDetail(Long qnaId){
        return qnaRepository.findById(qnaId);
    }

    @Override
    public Qna answer(Qna qna, QnaAnswerReq qnaAnswerReq){
        qna.setAnswer(qnaAnswerReq.getAnswer());
        qna.setAnsCheck(1);
        return qnaRepository.save(qna);
    }

    @Override
    public Qna answerDelete(Qna qna) {
        qna.setAnswer(null);
        qna.setAnsCheck(0);
        return qnaRepository.save(qna);
    }

}
