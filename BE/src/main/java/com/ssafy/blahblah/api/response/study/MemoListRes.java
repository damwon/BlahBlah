package com.ssafy.blahblahchat.api.response.study;

import com.ssafy.blahblah.db.entity.Memo;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class MemoListRes {

    private Long id;
    private String title;
    private LocalDateTime createdAt;

    public static MemoListRes fromEntity(Memo memo) {
        return MemoListRes.builder()
                .id(memo.getId())
                .title(memo.getTitle())
                .createdAt(memo.getCreatedAt())
                .build();
    }


}
