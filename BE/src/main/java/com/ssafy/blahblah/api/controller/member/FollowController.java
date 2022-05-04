package com.ssafy.blahblah.api.controller.member;

import com.ssafy.blahblah.api.service.member.UserService;
import com.ssafy.blahblah.common.auth.SsafyUserDetails;
import com.ssafy.blahblah.db.entity.Follow;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.repository.FollowRepository;
import com.ssafy.blahblah.db.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/follow")
public class FollowController {

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    FollowRepository followRepository;

    @PostMapping("/{userId}")
    public ResponseEntity follow(Authentication authentication, @PathVariable Long userId){
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String findUserId = userDetails.getUsername();
        User fromUser = userService.getUserByEmail(findUserId);
        Optional<User> userOptional = userRepository.findById(userId);
        if(userOptional.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        User toUser = userOptional.get();
        Optional<Follow> optionalFollow = followRepository.findByToUserAndFromUser(toUser,fromUser);
        if(optionalFollow.isEmpty()) { // 팔로우 한적이 없으면 팔로우하기
            followRepository.save(Follow.builder()
                    .followTime(LocalDateTime.now())
                    .fromUser(fromUser)
                    .toUser(toUser)
                    .build());
        }
        else { // 언팔로우하기
            followRepository.delete(optionalFollow.get());
        }

        return new ResponseEntity(HttpStatus.OK);

    }
}

