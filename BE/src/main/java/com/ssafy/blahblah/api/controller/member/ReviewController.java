package com.ssafy.blahblah.api.controller.member;

import com.ssafy.blahblah.api.service.member.ReviewService;
import com.ssafy.blahblah.api.service.member.UserService;
import com.ssafy.blahblah.common.auth.SsafyUserDetails;
import com.ssafy.blahblah.db.entity.Review;
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
@RequestMapping("/api/review")
public class ReviewController {

    private final UserService userService;

    private final ReviewService reviewService;

    @PostMapping("/{email}")
    public ResponseEntity rate(Authentication authentication, @PathVariable String email) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        Long upUserId = userDetails.getUser().getId();
        Long userId = userService.getUserByEmail(email).getId();
        String reviewTxt = email;
        if (upUserId == userId) {
            return new ResponseEntity<>("can not rate self",HttpStatus.NOT_FOUND);
        }

        Optional<Review> isReview = reviewService.isReview(upUserId, userId);

        if (isReview.isEmpty()) { // 코멘트를 남긴적이 있다면
            reviewService.reviewToUser(upUserId, userId, reviewTxt);
        }
        else { // 인기도를 누른 적이 있으면
            reviewService.updateReview(upUserId, userId, reviewTxt);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("reviewlist")
    public ResponseEntity getReviewList(Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        Long userId = userDetails.getUser().getId();

        List<Review> reviewList = reviewService.getReviewList(userId);
        return new ResponseEntity(reviewList,HttpStatus.OK);
    }

}
