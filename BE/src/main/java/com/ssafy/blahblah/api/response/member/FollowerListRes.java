package com.ssafy.blahblah.api.response.member;

import com.ssafy.blahblah.db.entity.Follow;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class FollowerListRes {
    private Long id;
    private String email;
    private String name;
    private LocalDateTime FollowTime;

    public static FollowerListRes fromEntity(Follow follow) {
        return FollowerListRes.builder()
                .id(follow.getFromUser().getId())
                .email(follow.getFromUser().getEmail())
                .name(follow.getFromUser().getName())
                .FollowTime(follow.getFollowTime())
                .build();
    }
}
