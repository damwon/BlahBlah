package com.ssafy.blahblah.api.response.study;

import com.ssafy.blahblah.db.entity.Memo;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MemoDetailRes {

    Long id;
    String title;
    String content;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;

    public MemoDetailRes(Memo memo) {
        this.id = memo.getId();
        this.title = memo.getTitle();
        this.content = memo.getContent();
        this.createdAt = memo.getCreatedAt();
        this.updatedAt = memo.getUpdatedAt();
    }
}
