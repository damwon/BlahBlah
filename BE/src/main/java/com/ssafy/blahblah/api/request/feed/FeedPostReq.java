package com.ssafy.blahblah.api.request.feed;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeedPostReq {
    String content;
    Boolean open;
}
