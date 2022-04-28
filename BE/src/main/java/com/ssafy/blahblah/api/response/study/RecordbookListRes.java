package com.ssafy.blahblah.api.response.study;

import com.ssafy.blahblah.db.entity.Recordbook;
import com.ssafy.blahblah.db.entity.Wordbook;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class RecordbookListRes {
    private Long id;
    private String title;
    private LocalDateTime createdAt;

    public static RecordbookListRes fromEntity(Recordbook recordbook) {
        return RecordbookListRes.builder()
                .id(recordbook.getId())
                .title(recordbook.getTitle())
                .createdAt(recordbook.getCreatedAt())
                .build();
    }
}
