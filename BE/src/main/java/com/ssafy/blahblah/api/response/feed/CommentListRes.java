package com.ssafy.blahblah.api.response.feed;

import com.ssafy.blahblah.db.entity.Comment;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CommentListRes {
    Long id;
    LocalDateTime createdAt;
    String content;
    Long userId;
    String userName;

    public static CommentListRes fromEntity(Comment comment) {
        return CommentListRes.builder()
                .id(comment.getId())
                .createdAt(comment.getCreatedAt())
                .content(comment.getContent())
                .userName(comment.getUser().getName())
                .userId(comment.getUser().getId())
                .build();
    }

//    public CommentListRes(Comment comment){
//        this.id = comment.getId();
//        this.createdAt = comment.getCreatedAt();
//        this.content = comment.getContent();
//        this.userName = comment.getUser().getName();
//    }

}
