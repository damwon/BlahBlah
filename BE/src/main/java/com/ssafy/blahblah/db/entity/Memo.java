package com.ssafy.blahblah.db.entity;

import io.swagger.annotations.Info;
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
@Table(name = "memo")
public class Memo extends BaseEntity{

    @Column(nullable = false)
    private String title;

    @Column
    private String content;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @Builder
    public Memo(String title, String content, LocalDateTime createdAt, LocalDateTime updatedAt, User user){
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.user = user;

    }
}
