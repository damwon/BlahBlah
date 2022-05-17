package com.ssafy.blahblah.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "review")
public class Review extends BaseEntity{

    @Column(nullable = false)
    private Long reviewUserId;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String reviewTxt;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Builder
    public Review(Long reviewUserId, Long userId, String reviewTxt, LocalDateTime createdAt) {
        this.reviewUserId = reviewUserId;
        this.userId = userId;
        this.reviewTxt = reviewTxt;
        this.createdAt = createdAt;
    }
}
