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
@Table(name = "feed")
public class Feed extends BaseEntity{


    @Column(nullable = false)
    private String content;

    @Column
    private String imgUrl;

    @Column
    private Boolean open;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @Column(nullable = false)
    private int likeCount;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "feed",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "feed",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Heart> hearts = new ArrayList<>();

    @Builder
    public Feed(String content,Boolean open, LocalDateTime createdAt, LocalDateTime updatedAt, String imgUrl, User user, int likeCount){
        this.content = content;
        this.open = open;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.user = user;
        this.imgUrl = imgUrl;
        this.likeCount = likeCount;

    }
}
