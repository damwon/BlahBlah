package com.ssafy.blahblah.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "follow")
public class Follow extends BaseEntity{

    @ManyToOne
    @JoinColumn(name="from_user_id", nullable = false)
    private User fromUser;

    @ManyToOne
    @JoinColumn(name="to_user_id", nullable = false)
    private User toUser;

    @Column
    private LocalDateTime followTime;


    @Builder
    public Follow(User fromUser, User toUser,LocalDateTime followTime) {
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.followTime = followTime;

    }
}
