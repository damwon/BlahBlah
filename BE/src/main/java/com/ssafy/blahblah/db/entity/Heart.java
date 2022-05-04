package com.ssafy.blahblah.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "heart")
public class Heart extends BaseEntity{

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name="feed_id", nullable = false)
    private Feed feed;

    @Builder
    public Heart(User user, Feed feed) {
        this.feed = feed;
        this.user = user;
    }
}
