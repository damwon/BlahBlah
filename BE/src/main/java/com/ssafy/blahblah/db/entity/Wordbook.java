package com.ssafy.blahblah.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "wordbook")
public class Wordbook extends BaseEntity{
    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "wordbook",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Word> words = new ArrayList<>();

    @Builder
    public Wordbook(String title, LocalDateTime createdAt, User user) {
        this.title = title;
        this.createdAt = createdAt;
        this.user = user;
    }
}
