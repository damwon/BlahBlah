package com.ssafy.blahblah.api.response.member;

import com.ssafy.blahblah.db.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class BanUserRes {
    private String reason;
    private LocalDateTime expiredAt;

    public BanUserRes(User user, String reason){
        this.reason = reason;
        this.expiredAt = user.getExpiredAt();
    }
}
