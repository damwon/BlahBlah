package com.ssafy.blahblah.api.response.notice;

import com.ssafy.blahblah.db.entity.Qna;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MyQnaDetailRes {
    String title;
    String content;
    LocalDateTime createdAt;
    String imgUrl;
    String answer;

    public MyQnaDetailRes(Qna qna) {
        this.title = qna.getTitle();
        this.content = qna.getContent();
        this.createdAt = qna.getCreatedAt();
        this.imgUrl = qna.getImgUrl();
        this.answer = qna.getAnswer();
    }
}
