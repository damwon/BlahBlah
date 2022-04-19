package com.ssafy.blahblah.db.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import javax.persistence.*;

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
    Long user_id = null;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String name;

    @column
    private int gender;

    @column
    private int age;

    @column
    private String email;

    @Column
    private String description;

    @Column
    private String profile_img;

    @column
    private int authority;

    @column
    private int reported_cnt;

    @column
    private LocalDateTime created_at;

    @Builder
    public User(Long user_id, String address, String name, int gender, int age, String email, String description, String profile_img, int authority, int reported_cnt,  LocalDateTime created_at) {

        this.user_id = user_id;
        this.address = address;
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.email = email;
        this.description = description;
        this.profile_img = profile_img;
        this.authority = authority;
        this.reported_cnt = reported_cnt;
        this.created_at = created_at;

    }
}
