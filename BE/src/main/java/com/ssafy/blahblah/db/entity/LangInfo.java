package com.ssafy.blahblah.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
public class LangInfo {

    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id = null;

    @Column(nullable = false)
    private Integer level;

    @JsonIgnore
    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Long langId;

    @Builder
    public LangInfo(Long userId, Long langId, Integer level) {
        this.userId = userId;
        this.langId = langId;
        this.level = level;
    }
}
