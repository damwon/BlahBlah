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
    private Long upUserId;

    @Column(nullable = false)
    private Long userId;

    @Builder
    public Rating(Long upUserId, Long userId) {
        this.upUserId = upUserId;
        this.userId = userId;
    }
}
