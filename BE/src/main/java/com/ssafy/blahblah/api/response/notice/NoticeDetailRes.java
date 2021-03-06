package com.ssafy.blahblah.api.response.notice;

import com.ssafy.blahblah.db.entity.Memo;
import com.ssafy.blahblah.db.entity.Notice;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class NoticeDetailRes {
    Long id;
    String title;
    String content;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;

    public NoticeDetailRes(Notice notice) {
        this.id = notice.getId();
        this.title = notice.getTitle();
        this.content = notice.getContent();
        this.createdAt = notice.getCreatedAt();
        this.updatedAt = notice.getUpdatedAt();
    }
}
