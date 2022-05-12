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
public class FollowingListRes {
    private Long id;
    private String email;
    private String name;
    private LocalDateTime FollowTime;

    public static FollowingListRes fromEntity(Follow follow){
        return FollowingListRes.builder()
                .id(follow.getToUser().getId())
                .email(follow.getToUser().getEmail())
                .name(follow.getToUser().getName())
                .FollowTime(follow.getFollowTime())
                .build();
    }

}
