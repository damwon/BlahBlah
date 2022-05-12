//package com.ssafy.blahblah.api.response.member;
//
//import com.ssafy.blahblah.api.request.member.UserLangPostReq;
//import com.ssafy.blahblah.api.response.feed.CommentListRes;
////import com.ssafy.blahblah.api.response.language.LangListRes;
//import com.ssafy.blahblah.db.entity.Rating;
//import com.ssafy.blahblah.db.entity.User;
//import io.swagger.annotations.ApiModel;
//import io.swagger.annotations.ApiModelProperty;
//import lombok.*;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
//@ToString
//public class UserLangInfoRes {
//    private Long id;
//    private String email;
//    private String name;
//    private Integer gender;
//    private Integer age;
//    private String description;
//    private String profileImg;
//    private List langList;
//    private int rating;
//
//    public static UserLangInfoRes fromEntity(User user) {
//        return UserLangInfoRes.builder()
//                .id(user.getId())
//                .email(user.getEmail())
//                .name(user.getName())
//                .gender(user.getGender())
//                .age(user.getAge())
//                .description(user.getDescription())
//                .profileImg(user.getProfileImg())
//                .build();
//    }
//}
