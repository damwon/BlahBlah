package com.ssafy.blahblah.api.controller.feed;

import com.ssafy.blahblah.api.service.member.UserService;
import com.ssafy.blahblah.common.auth.SsafyUserDetails;
import com.ssafy.blahblah.db.entity.Feed;
import com.ssafy.blahblah.db.entity.Heart;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.repository.FeedRepository;
import com.ssafy.blahblah.db.repository.LikeRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/like")
public class LikeController {

    @Autowired
    UserService userService;

    @Autowired
    FeedRepository feedRepository;

    @Autowired
    LikeRepository likeRepository;

    @PostMapping("/{feedId}")
    public ResponseEntity like(Authentication authentication, @PathVariable Long feedId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        Optional<Feed> optionalFeed = feedRepository.findById(feedId);
        if(optionalFeed.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Feed feed = optionalFeed.get();
        Optional<Heart> optionalLike = likeRepository.findByUserAndFeed(user,feed);
        if (optionalLike.isEmpty()) { // 좋아요를 누른 적이 없으면
            likeRepository.save(Heart.builder()
                    .feed(feed)
                    .user(user)
                    .build());
            feed.setLikeCount(feed.getLikeCount()+1);
            feedRepository.save(feed);

        }
        else { // 좋아요를 누른 적이 있으면
            likeRepository.delete(optionalLike.get());
            feed.setLikeCount(feed.getLikeCount()-1);
            feedRepository.save(feed);

        }
        return new ResponseEntity(HttpStatus.OK);

    }

}
