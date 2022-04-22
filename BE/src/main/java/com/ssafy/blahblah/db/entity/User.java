package com.ssafy.blahblah.db.entity;


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
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id = null;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int gender;

    @Column(nullable = false)
    private int age;

    @Column(nullable = false)
    private String email;

    @Column
    private String description;

    @Column
    private String profileImg;

    @Column(nullable = false)
    private int authority;

    @ColumnDefault("0")
    private int reportedCnt;

    @Column(nullable = false)
    private LocalDateTime expiredAt;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false)
    String password;

    @Builder
    public User(String name, int gender, int age, String email, String description, String profileImg,
                int authority, int reportedCnt, LocalDateTime  expiredAt, LocalDateTime createdAt, String password) {
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.email = email;
        this.description = description;
        this.profileImg = profileImg;
        this.authority = authority;
        this.reportedCnt = reportedCnt;
        this.expiredAt = expiredAt;
        this.createdAt = createdAt;
        this.password = password;
    }
}
