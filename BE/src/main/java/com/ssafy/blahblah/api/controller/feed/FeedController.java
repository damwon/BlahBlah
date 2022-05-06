package com.ssafy.blahblah.api.controller.feed;

import com.ssafy.blahblah.api.request.feed.FeedPostReq;
import com.ssafy.blahblah.api.response.feed.FeedListRes;
import com.ssafy.blahblah.api.service.feed.FeedService;
import com.ssafy.blahblah.api.service.feed.FeedServiceImpl;
import com.ssafy.blahblah.api.service.member.UserService;
import com.ssafy.blahblah.api.service.s3.AwsS3Service;
import com.ssafy.blahblah.common.auth.SsafyUserDetails;
import com.ssafy.blahblah.db.entity.Feed;
import com.ssafy.blahblah.db.entity.Follow;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.repository.FeedRepository;
import com.ssafy.blahblah.db.repository.FollowRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/feed")
public class FeedController {

    @Autowired
    UserService userService;

    @Autowired
    AwsS3Service awsS3Service;


    @Autowired
    FeedService feedService;

    @GetMapping
    public ResponseEntity listForAll(Authentication authentication){
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        List<Feed> allFeeds = feedService.listForAll(user);
        List<FeedListRes> dto = allFeeds.stream().map(FeedListRes::fromEntity).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @GetMapping("/friends")
    public ResponseEntity listForFriends(Authentication authentication) {

        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        List<Feed> allFeeds = feedService.listForFriends(user);
        List<FeedListRes> dto = allFeeds.stream().map(FeedListRes::fromEntity).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(dto);

    }


    @PostMapping
    public ResponseEntity post(Authentication authentication,
                               @RequestPart(value="image", required = false) List<MultipartFile> multipartFile,
                               @RequestPart(value="feedPostReq") FeedPostReq feedPostReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);

        String img;
        if (multipartFile.get(0).isEmpty()) {
            img = null;
        }
        else {
            img = awsS3Service.uploadImage(multipartFile, "feed").get(0);
        }

        feedService.post(user,img,feedPostReq);
        return new ResponseEntity(HttpStatus.OK);

    }


    @PutMapping("/{feedId}")
    public ResponseEntity update(Authentication authentication,@PathVariable Long feedId,
                                 @RequestPart(value="image", required = false) List<MultipartFile> multipartFile,
                                 @RequestPart(value="feedPostReq") FeedPostReq feedPostReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        return feedService.update(user,feedPostReq,multipartFile,feedId);
    }


    @DeleteMapping("/{feedId}")
    public ResponseEntity delete ( Authentication authentication, @PathVariable Long feedId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        return feedService.delete(user,feedId);
    }



}
