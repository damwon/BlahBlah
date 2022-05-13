package com.ssafy.blahblah.api.controller.member;

import com.ssafy.blahblah.api.service.member.RatingService;
import com.ssafy.blahblah.api.service.member.UserService;
import com.ssafy.blahblah.common.auth.SsafyUserDetails;
import com.ssafy.blahblah.db.entity.Rating;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/rate")
public class RatingController {

    private final UserService userService;

    private final RatingService ratingService;

    @PostMapping("/{email}")
    public ResponseEntity rate(Authentication authentication, @PathVariable String email) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        Long upUserId = userDetails.getUser().getId();
        Long userId = userService.getUserByEmail(email).getId();
        if (upUserId == userId) {
            return new ResponseEntity<>("can not rate self",HttpStatus.NOT_FOUND);
        }

        Optional<Rating> isRating = ratingService.isRating(upUserId, userId);

        if (isRating.isEmpty()) { // 인기도를 누른 적이 없으면
            ratingService.upRating(upUserId, userId);
        }
        else { // 인기도를 누른 적이 있으면
            ratingService.downRating(upUserId, userId);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("ratedlist")
    public ResponseEntity getRatedList(Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        Long userId = userDetails.getUser().getId();

        List<Rating> ratedList = ratingService.getRatedList(userId);
        return new ResponseEntity(ratedList,HttpStatus.OK);
    }

}
