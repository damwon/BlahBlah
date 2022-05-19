package com.ssafy.blahblah.api.service.member;

import com.ssafy.blahblah.db.entity.Follow;
import com.ssafy.blahblah.db.entity.User;

import java.util.List;
import java.util.Optional;

public interface FollowService {
    Optional<User> getUser(Long userId);

    Optional<Follow> getFollow(User toUser, User fromUser);

    Follow postFollow(User toUser, User fromUser);

    void unfollow(Optional<Follow> optionalFollow);

    List<Follow> getMyFollowings(User user);

    List<Follow> getMyFollowers(User user);
}
