package com.ssafy.blahblah.api.service.feed;

import com.ssafy.blahblah.db.entity.Feed;
import com.ssafy.blahblah.db.entity.Heart;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.repository.FeedRepository;
import com.ssafy.blahblah.db.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LikeServiceImpl implements LikeService{

    @Autowired
    FeedRepository feedRepository;

    @Autowired
    LikeRepository likeRepository;


    @Override
    public Feed like(User user, Long feedId){
        Optional<Feed> optionalFeed = feedRepository.findById(feedId);
        if(optionalFeed.isEmpty()) {
            return null;
        }
        Feed feed = optionalFeed.get();
        Optional<Heart> optionalLike = likeRepository.findByUserAndFeed(user,feed);
        if (optionalLike.isEmpty()) { // 좋아요를 누른 적이 없으면
            likeRepository.save(Heart.builder()
                    .feed(feed)
                    .user(user)
                    .build());
            feed.setLikeCount(feed.getLikeCount()+1);

        }
        else { // 좋아요를 누른 적이 있으면
            likeRepository.delete(optionalLike.get());
            feed.setLikeCount(feed.getLikeCount()-1);

        }
        return feedRepository.save(feed);
    }



}
