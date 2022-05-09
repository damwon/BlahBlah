package com.ssafy.blahblah.api.service.feed;

import com.ssafy.blahblah.db.entity.Feed;
import com.ssafy.blahblah.db.entity.User;

public interface LikeService {
    Feed like(User user, Long feedId);
}
