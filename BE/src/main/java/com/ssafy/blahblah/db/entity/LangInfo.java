package com.ssafy.blahblah.db.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
public class LangInfo extends BaseEntity {

    @Column(nullable = false)
    private Integer level;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name="lang_id", nullable = false)
    private Language language;

    @Builder
    public LangInfo(User user, Language language, Integer level) {
        this.user = user;
        this.language = language;
        this.level = level;
    }
}
