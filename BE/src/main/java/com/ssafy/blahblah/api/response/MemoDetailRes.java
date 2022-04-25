package com.ssafy.blahblah.api.response;

import com.ssafy.blahblah.db.entity.Memo;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MemoDetailRes {

    String title;
    String content;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;

    public MemoDetailRes(Memo memo) {
        this.title = memo.getTitle();
        this.content = memo.getContent();
        this.createdAt = memo.getCreatedAt();
        this.updatedAt = memo.getUpdatedAt();
    }
}
