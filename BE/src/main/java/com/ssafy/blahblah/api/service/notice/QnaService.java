package com.ssafy.blahblah.api.service.notice;

import com.ssafy.blahblah.api.request.notice.MyQnaReq;
import com.ssafy.blahblah.api.request.notice.QnaAnswerReq;
import com.ssafy.blahblah.db.entity.Qna;
import com.ssafy.blahblah.db.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

public interface QnaService {
    Page<Qna> myQnaList(User user, Pageable pageable);

    ResponseEntity myQnaDetail(User user, Long qnaId);

    Qna myQnaPost(User user, MyQnaReq qnaReq);

    ResponseEntity myQnaDelete(User user, Long qnaId);

    Page<Qna> qnaList(Pageable pageable);

    Optional<Qna> qnaDetail(Long qnaId);

    Qna answer(Qna qna, QnaAnswerReq qnaAnswerReq);


    Qna answerDelete(Qna qna);
}
