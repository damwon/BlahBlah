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
    String email;
    String userName;
    String userProfile;



    public static CommentListRes fromEntity(Comment comment) {
        String profileImg;
        if(comment.getUser().getProfileImg() != null) {
            profileImg = "https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/profile/"+comment.getUser().getProfileImg();
        }
        else {
            profileImg = null;
        }

        return CommentListRes.builder()
                .id(comment.getId())
                .createdAt(comment.getCreatedAt())
                .content(comment.getContent())
                .email(comment.getUser().getEmail())
                .userName(comment.getUser().getName())
                .userId(comment.getUser().getId())
                .userProfile(profileImg)
                .build();
    }

//

}
