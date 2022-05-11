package com.ssafy.blahblah.api.response.feed;

import com.ssafy.blahblah.db.entity.Feed;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedDetailRes {
    private Long id;
    private String content;
    private String imgUrl;
    private Boolean open;

    public FeedDetailRes(Feed feed) {
        String imgTmp;
        if(feed.getImgUrl() != null) {
            imgTmp = "https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/feed/"+feed.getImgUrl();
        }
        else {
            imgTmp = null;
        }
        this.id = feed.getId();
        this.content = feed.getContent();
        this.imgUrl = imgTmp;
        this.open = feed.getOpen();
    }

}
