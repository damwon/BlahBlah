package com.ssafy.blahblah.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "word")
public class Word extends BaseEntity{

    @Column(nullable = false)
    private String word;

    @Column(nullable = false)
    private String meaning;

    @Column(nullable = false)
    private LocalDateTime createdAt;

//    @Column(nullable = false)
//    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name="wordbook_id", nullable = false)
    private Wordbook wordbook;

}
