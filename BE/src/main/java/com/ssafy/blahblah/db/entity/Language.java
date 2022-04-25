package com.ssafy.blahblah.db.entity;

import lombok.*;
import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Language extends BaseEntity {

    @Column(nullable = false)
    private String code;

    @Column(nullable = false)
    private String langImg;

    @Column(nullable = false)
    private String engName;

    @Builder
    public Language(String code, String langImg, String engName) {
        this.code = code;
        this.langImg = langImg;
        this.engName = engName;
    }
}
