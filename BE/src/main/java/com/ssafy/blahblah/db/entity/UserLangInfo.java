//package com.ssafy.blahblah.db.entity;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import org.hibernate.annotations.ColumnDefault;
//
//import javax.persistence.*;
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//
//@Entity
//@Getter
//@Setter
//@NoArgsConstructor
//@Table(name = "userLangInfo")
//public class UserLangInfo extends BaseEntity{
//
//    @Column(nullable = false)
//    private String email;
//
//    @Column(nullable = false)
//    private String name;
//
//    @Column(nullable = false)
//    private Integer gender;
//
//    @Column(nullable = false)
//    private Integer age;
//
//    @Column
//    private String description;
//
//    @Column(nullable = false)
//    private String profileImg;
//
//    @JsonIgnore
//    @OneToMany(mappedBy = "feed",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    private ArrayList<LangInfo> langList;
//
//    @Builder
//    public UserLangInfo(String name, Integer gender, Integer age, String email, String description, String profileImg, ArrayList langList) {
//        this.email = email;
//        this.name = name;
//        this.gender = gender;
//        this.age = age;
//        this.description = description;
//        this.profileImg = profileImg;
//        this.langList = langList;
//    }
//}
