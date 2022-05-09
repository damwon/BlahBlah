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
@Table(name = "report")
public class Report extends BaseEntity{

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column
    private String imgUrl;

    @Column
    private String type;

    @ManyToOne
    @JoinColumn(name="reporter_id", nullable = false)
    private User reporter;

    @ManyToOne
    @JoinColumn(name="reportee_id", nullable = false)
    private User reportee;

    @Builder
    public Report(String content, LocalDateTime createdAt,String imgUrl,String type,User reporter,User reportee){
        this.content = content;
        this.createdAt = createdAt;
        this.imgUrl = imgUrl;
        this.type = type;
        this.reportee = reportee;
        this.reporter = reporter;
    }
}
