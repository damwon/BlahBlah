package com.ssafy.blahblah.api.controller.member;

import com.ssafy.blahblah.api.response.member.FollowerListRes;
import com.ssafy.blahblah.api.response.member.FollowingListRes;
import com.ssafy.blahblah.api.response.member.ReportListRes;
import com.ssafy.blahblah.api.service.member.FollowService;
import com.ssafy.blahblah.api.service.member.UserService;
import com.ssafy.blahblah.common.auth.SsafyUserDetails;
import com.ssafy.blahblah.db.entity.Follow;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.repository.FollowRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/follow")
public class FollowController {

    @Autowired
    UserService userService;

    @Autowired
    FollowService followService;

    @PostMapping("/{userId}")
    public ResponseEntity follow(Authentication authentication, @PathVariable Long userId){
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String findUserId = userDetails.getUsername();
        User fromUser = userService.getUserByEmail(findUserId);
        Optional<User> userOptional = followService.getUser(userId);
        if(userOptional.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        User toUser = userOptional.get();
        if(fromUser == toUser){
            return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
        }
        Optional<Follow> optionalFollow = followService.getFollow(toUser,fromUser);
        if(optionalFollow.isEmpty()) { // 팔로우 한적이 없으면 팔로우하기

            followService.postFollow(toUser,fromUser);
        }
        else { // 언팔로우하기

            followService.unfollow(optionalFollow);
        }

        return new ResponseEntity(HttpStatus.OK);

    }

    @GetMapping("/following")
    public ResponseEntity getMyFollowing(Authentication authentication){
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String findUserId = userDetails.getUsername();
        User user = userService.getUserByEmail(findUserId);
        List<Follow> myFollowings = followService.getMyFollowings(user);
        List<FollowingListRes> dto = myFollowings.stream().map(FollowingListRes::fromEntity).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @GetMapping("/follower")
    public ResponseEntity getMyFollower(Authentication authentication){
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String findUserId = userDetails.getUsername();
        User user = userService.getUserByEmail(findUserId);
        List<Follow> myFollowers = followService.getMyFollowers(user);
        List<FollowerListRes> dto = myFollowers.stream().map(FollowerListRes::fromEntity).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

}

