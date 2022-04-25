package com.ssafy.blahblah.db.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "word")
@NoArgsConstructor
public class Word extends BaseEntity{

    @Column(nullable = false)
    private String word;

    @Column(nullable = false)
    private String meaning;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name="wordbook_id", nullable = false)
    private Wordbook wordbook;

    @Builder
    public Word(String word,String meaning,LocalDateTime createdAt,LocalDateTime updatedAt, User user,Wordbook wordbook) {
        this.word = word;
        this.meaning = meaning;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.user = user;
        this.wordbook = wordbook;
    }


}
