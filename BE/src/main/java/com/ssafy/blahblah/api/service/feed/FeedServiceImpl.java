package com.ssafy.blahblah.api.service.feed;

import com.ssafy.blahblah.api.request.feed.FeedPostReq;
import com.ssafy.blahblah.api.service.s3.AwsS3Service;
import com.ssafy.blahblah.db.entity.Feed;
import com.ssafy.blahblah.db.entity.Follow;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.repository.FeedRepository;
import com.ssafy.blahblah.db.repository.FollowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FeedServiceImpl implements FeedService{

    @Autowired
    FeedRepository feedRepository;

    @Autowired
    FollowRepository followRepository;

    @Autowired
    AwsS3Service awsS3Service;

    @Override
    public List<Feed> listForAll(User user){
        List<Feed> allFeeds = new ArrayList<>();

        List<Feed> feedList = feedRepository.findByUserOrOpenTrue(user);
        allFeeds.addAll(feedList);
        List<Follow> follows = followRepository.findAllByFromUser(user);
        follows.forEach(follow -> {
            if(followRepository.findByToUserAndFromUser(user,follow.getToUser()).isPresent()){
                List<Feed> feeds = feedRepository.findByUserAndOpenFalse(follow.getToUser());
                allFeeds.addAll(feeds);
            }

        });

        return allFeeds;
    }

    @Override
    public List<Feed> listForFriends(User user){
        List<Follow> follows = followRepository.findAllByFromUser(user);
        List<Feed> myFeeds = feedRepository.findAllByUser(user);
        List<Feed> allFeeds = new ArrayList<>();
        follows.forEach(follow -> {
            if(followRepository.findByToUserAndFromUser(user,follow.getToUser()).isPresent()){
                List<Feed> feeds = feedRepository.findAllByUser(follow.getToUser());
                allFeeds.addAll(feeds);
            }

        });
        allFeeds.addAll(myFeeds);
        return allFeeds;
    }

    @Override
    public Feed post(User user, String img, FeedPostReq feedPostReq) {
        return feedRepository.save(Feed.builder()
                .content(feedPostReq.getContent())
                .open(feedPostReq.getOpen())
                .likeCount(0)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .user(user)
                .imgUrl(img)
                .build());
    }

    @Override
    public ResponseEntity update(User user, FeedPostReq feedPostReq, List<MultipartFile> multipartFile, Long feedId){
        Optional<Feed> option = feedRepository.findById(feedId);
        if(option.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Feed feed = option.get();
        if(feed.getUser().equals(user)){
            feed.setContent(feedPostReq.getContent());
            feed.setOpen(feedPostReq.getOpen());
            feed.setUpdatedAt(LocalDateTime.now());
            String img;
            if (multipartFile.get(0).isEmpty()) {
                img = null;
            }
            else {
                img = awsS3Service.uploadImage(multipartFile, "feed").get(0);
            }
            feed.setImgUrl(img);
            feedRepository.save(feed);
            return new ResponseEntity(HttpStatus.OK);

        }

        return new ResponseEntity(HttpStatus.UNAUTHORIZED);
    }

    @Override
    public ResponseEntity delete(User user,Long feedId) {
        Optional<Feed> option = feedRepository.findById(feedId);
        if(option.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Feed feed = option.get();
        if(feed.getUser().equals(user)) {
            feedRepository.deleteById(feedId);
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.UNAUTHORIZED);
    }
}
