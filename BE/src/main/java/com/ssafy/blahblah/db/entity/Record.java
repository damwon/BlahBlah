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
@Table(name = "record")
@NoArgsConstructor
public class Record extends BaseEntity{

    @Column(nullable = false)
    private String recordUrl;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column
    private String title;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name="recordbook_id", nullable = false)
    private Recordbook recordbook;

    @Builder
    public Record(String recordUrl,String title,LocalDateTime createdAt, User user, Recordbook recordbook) {
        this.recordUrl = recordUrl;
        this.title = title;
        this.createdAt = createdAt;
        this.user =user;
        this.recordbook = recordbook;
    }
}
