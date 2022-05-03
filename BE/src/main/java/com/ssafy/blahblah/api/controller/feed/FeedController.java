package com.ssafy.blahblah.api.controller.feed;

import com.ssafy.blahblah.api.request.feed.FeedPostReq;
import com.ssafy.blahblah.api.response.feed.FeedListRes;
import com.ssafy.blahblah.api.service.member.UserService;
import com.ssafy.blahblah.api.service.s3.AwsS3Service;
import com.ssafy.blahblah.common.auth.SsafyUserDetails;
import com.ssafy.blahblah.db.entity.Feed;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.repository.FeedRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/feed")
public class FeedController {

    @Autowired
    FeedRepository feedRepository;

    @Autowired
    UserService userService;

    @Autowired
    AwsS3Service awsS3Service;

    @GetMapping
    public ResponseEntity listForAll(Authentication authentication){
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        List<Feed> feedList = feedRepository.findByUserOrOpenTrue(user);
        if (feedList == null || feedList.size() == 0) {
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }

        List<FeedListRes> dto = feedList.stream().map(FeedListRes::fromEntity).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @GetMapping("/friends")
    public ResponseEntity listForFriends(Authentication authentication) {
        return new ResponseEntity(HttpStatus.OK);
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

        feedRepository.save(Feed.builder()
                .content(feedPostReq.getContent())
                .open(feedPostReq.getOpen())
                .likeCount(0)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .user(user)
                .imgUrl(img)
                .build());

        return new ResponseEntity(HttpStatus.OK);

    }


    @PutMapping("/{feedId}")
    public ResponseEntity update(Authentication authentication,@PathVariable Long feedId,
                                 @RequestPart(value="image", required = false) List<MultipartFile> multipartFile,
                                 @RequestPart(value="feedPostReq") FeedPostReq feedPostReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
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


    @DeleteMapping("/{feedId}")
    public ResponseEntity delete ( Authentication authentication, @PathVariable Long feedId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        Optional<Feed> option = feedRepository.findById(feedId);
        if(option.isEmpty()) {
            return null;
        }
        Feed feed = option.get();
        if(feed.getUser().equals(user)) {
            feedRepository.deleteById(feedId);
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.UNAUTHORIZED);
    }



}
