package com.ssafy.blahblahcall.db.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * 유저 모델 정의.
 */

@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
public class User extends BaseEntity{

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer gender;

    @Column(nullable = false)
    private Integer age;

    @Column
    private String description;

    @Column(nullable = false)
    private String profileImg;

    @Column(nullable = false)
    private String authority;

    @ColumnDefault("0")
    private Integer reportedCnt;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime expiredAt;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false)
    private String password;

    @Builder
    public User(String name, Integer gender, Integer age, String email, String description, String profileImg,
                String authority, Integer reportedCnt, LocalDateTime expiredAt, LocalDateTime createdAt, String password) {
        this.email = email;
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.description = description;
        this.profileImg = profileImg;
        this.authority = authority;
        this.reportedCnt = reportedCnt;
        this.createdAt = createdAt;
        this.expiredAt = expiredAt;
        this.password = password;
    }
}
