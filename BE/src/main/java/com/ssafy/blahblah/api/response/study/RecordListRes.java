package com.ssafy.blahblah.api.response.study;

import com.ssafy.blahblah.db.entity.Record;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class RecordListRes {

    private Long id;
    private String title;
    private String recordUrl;
    private LocalDateTime createdAt;

    public static RecordListRes fromEntity(Record record) {
        return RecordListRes.builder()
                .id(record.getId())
                .title(record.getTitle())
                .recordUrl(record.getRecordUrl())
                .createdAt(record.getCreatedAt())

                .build();
    }
}
