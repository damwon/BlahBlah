package com.ssafy.blahblah.api.response.notice;

import com.ssafy.blahblah.db.entity.Qna;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class MyQnaListRes {

    private Long id;
    private String title;
    private LocalDateTime createdAt;
    private int ansCheck;

    public static MyQnaListRes fromEntity(Qna qna) {
        return MyQnaListRes.builder()
                .id(qna.getId())
                .title(qna.getTitle())
                .createdAt(qna.getCreatedAt())
                .ansCheck(qna.getAnsCheck())
                .build();
    }
}
