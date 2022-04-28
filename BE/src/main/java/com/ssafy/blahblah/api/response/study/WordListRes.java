package com.ssafy.blahblah.api.response.study;

import com.ssafy.blahblah.db.entity.Word;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class WordListRes {

    private Long id;
    private String word;
    private String meaning;
    private LocalDateTime createdAt;

    public static WordListRes fromEntity(Word word) {
        return WordListRes.builder()
                .id(word.getId())
                .word(word.getWord())
                .meaning(word.getMeaning())
                .createdAt(word.getCreatedAt())

                .build();
    }




}
