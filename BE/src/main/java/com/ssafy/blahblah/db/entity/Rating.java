package com.ssafy.blahblah.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "rating")
public class Rating extends BaseEntity{

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Long upUserId;

    @Builder
    public Rating(Long userId, Long upUserId) {
        this.userId = userId;
        this.upUserId = upUserId;
    }
}
