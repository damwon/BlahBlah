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
@Table(name = "banreason")
public class BanReason extends BaseEntity{

    @Column
    private String reason;

    @Column
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime expiredAt;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @Builder
    public BanReason(String reason,LocalDateTime createdAt, LocalDateTime expiredAt,User user){
        this.reason = reason;
        this.createdAt = createdAt;
        this.expiredAt = expiredAt;
        this.user = user;
    }

}
