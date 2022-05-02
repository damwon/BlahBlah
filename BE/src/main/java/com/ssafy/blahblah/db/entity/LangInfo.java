package com.ssafy.blahblah.db.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
public class LangInfo extends BaseEntity {

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Long langId;

    @Column(nullable = false)
    private Integer level;

    @Builder
    public LangInfo(Long userId, Long langId, Integer level) {
        this.userId = userId;
        this.langId = langId;
        this.level = level;
    }
}
