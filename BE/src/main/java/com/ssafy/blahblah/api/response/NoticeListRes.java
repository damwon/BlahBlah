package com.ssafy.blahblah.api.response;

import com.ssafy.blahblah.db.entity.Memo;
import com.ssafy.blahblah.db.entity.Notice;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class NoticeListRes {
    private Long id;
    private String title;
    private LocalDateTime createdAt;

    public static NoticeListRes fromEntity(Notice notice) {
        return NoticeListRes.builder()
                .id(notice.getId())
                .title(notice.getTitle())
                .createdAt(notice.getCreatedAt())
                .build();
    }
}
