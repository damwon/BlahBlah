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
@Table(name = "recordbook")
public class Recordbook extends BaseEntity{

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "recordbook",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Record> records = new ArrayList<>();

    @Builder
    public Recordbook(String title, LocalDateTime createdAt, User user) {
        this.title = title;
        this.createdAt = createdAt;
        this.user = user;
    }
}
