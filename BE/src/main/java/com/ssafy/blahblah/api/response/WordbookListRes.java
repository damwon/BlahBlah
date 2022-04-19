package com.ssafy.blahblah.api.response;

import com.ssafy.blahblah.db.entity.Wordbook;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class WordbookListRes {
    private Long id;
    private String title;
    private LocalDateTime createdAt;

    public static WordbookListRes fromEntity(Wordbook wordbook) {
        return WordbookListRes.builder()
                .id(wordbook.getId())
                .title(wordbook.getTitle())
                .createdAt(wordbook.getCreatedAt())
                .build();
    }
}
