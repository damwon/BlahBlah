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
@Table(name = "qna")
public class Qna extends BaseEntity{

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column
    private String answer;

    @Column
    private String imgUrl;

    @Column(nullable = false)
    private int ansCheck;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @Builder
    public Qna (String title, String content, LocalDateTime createdAt, String answer, String imgUrl, int ansCheck, User user) {
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.answer = answer;
        this.imgUrl = imgUrl;
        this.ansCheck = ansCheck;
        this.user = user;

    }


}
