package com.ssafy.blahblah.api.service.feed;

import com.ssafy.blahblah.db.entity.Feed;
import com.ssafy.blahblah.db.entity.Heart;
import com.ssafy.blahblah.db.entity.User;

import java.util.Optional;

public interface LikeService {
    Feed like(User user, Long feedId);

    Optional<Heart> findByUserAndFeed(User user, Feed feed);
}
