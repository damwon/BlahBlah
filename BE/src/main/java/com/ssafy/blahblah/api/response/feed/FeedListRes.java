package com.ssafy.blahblah.api.response.feed;
import com.ssafy.blahblah.db.entity.Feed;
import lombok.*;

import java.util.List;
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
    private Boolean open;
    private int likeCount;
    private List<CommentListRes> comments;

    public static FeedListRes fromEntity(Feed feed) {
        return FeedListRes.builder()
                .id(feed.getId())
                .content(feed.getContent())
                .imgUrl(feed.getImgUrl())
                .open(feed.getOpen())
                .userName(feed.getUser().getName())
                .likeCount(feed.getLikeCount())
                .comments(feed.getComments().stream().map(CommentListRes::fromEntity).collect(Collectors.toList()))
                .build();
    }
}
