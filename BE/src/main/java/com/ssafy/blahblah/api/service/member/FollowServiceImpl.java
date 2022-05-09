package com.ssafy.blahblah.api.service.member;

import com.ssafy.blahblah.db.entity.Follow;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.repository.FollowRepository;
import com.ssafy.blahblah.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class FollowServiceImpl implements FollowService{
    @Autowired
    UserRepository userRepository;

    @Autowired
    FollowRepository followRepository;

    @Override
    public Optional<User> getUser(Long userId) {
        return userRepository.findById(userId);
    }

    @Override
    public Optional<Follow> getFollow(User toUser, User fromUser){
        return followRepository.findByToUserAndFromUser(toUser,fromUser);
    }

    @Override
    public Follow postFollow(User toUser, User fromUser){
        return followRepository.save(Follow.builder()
                .followTime(LocalDateTime.now())
                .fromUser(fromUser)
                .toUser(toUser)
                .build());
    }

    @Override
    public void unfollow(Optional<Follow> optionalFollow) {
        followRepository.delete(optionalFollow.get());
    }
}
