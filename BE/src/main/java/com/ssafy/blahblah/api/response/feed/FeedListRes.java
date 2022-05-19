package com.ssafy.blahblah.api.response.feed;
import com.ssafy.blahblah.api.service.feed.LikeService;
import com.ssafy.blahblah.db.entity.Feed;
import com.ssafy.blahblah.db.entity.Heart;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.repository.LikeRepository;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class FeedListRes {

    private Long id;
    private String content;
    private String imgUrl;
    private String userName;
    private Long userId;
    private String email;
    private String userProfile;
    private Boolean open;
    private Boolean isLike;
    private int likeCount;
    private LocalDateTime createdAt;

    private List<CommentListRes> comments;


    public static FeedListRes fromEntity(Feed feed,Boolean isLike) {
        String imgTmp;
        if(feed.getImgUrl() != null) {
            imgTmp = "https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/feed/"+feed.getImgUrl();
        }
        else {
            imgTmp = null;
        }

        String profileImg;
        if(feed.getUser().getProfileImg() != null) {
            profileImg = "https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/profile/"+feed.getUser().getProfileImg();
        }
        else {
            profileImg = null;
        }


        return FeedListRes.builder()
                .id(feed.getId())
                .content(feed.getContent())
                .imgUrl(imgTmp)
                .open(feed.getOpen())
                .userName(feed.getUser().getName())
                .userId(feed.getUser().getId())
                .email(feed.getUser().getEmail())
                .likeCount(feed.getLikeCount())
                .isLike(isLike)
                .createdAt(feed.getCreatedAt())
                .userProfile(profileImg)
                .comments(feed.getComments().stream().map(CommentListRes::fromEntity).sorted(Comparator.comparing(CommentListRes::getCreatedAt)).collect(Collectors.toList()))
                .build();
    }
}
