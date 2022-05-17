package com.ssafy.blahblah.api.controller.member;

import com.ssafy.blahblah.api.request.member.UserLangPostReq;
import com.ssafy.blahblah.api.request.review.ReviewPostReq;
import com.ssafy.blahblah.api.response.member.ReviewListRes;
import com.ssafy.blahblah.api.service.member.ReviewService;
import com.ssafy.blahblah.api.service.member.UserService;
import com.ssafy.blahblah.common.auth.SsafyUserDetails;
import com.ssafy.blahblah.common.model.response.BaseResponseBody;
import com.ssafy.blahblah.db.entity.Review;
import com.ssafy.blahblah.db.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
    public ResponseEntity postReview(Authentication authentication, @PathVariable String email, @RequestBody ReviewPostReq reviewPostReq){
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        Long reviewUserId = userDetails.getUser().getId();
        Long userId = userService.getUserByEmail(email).getId();

        Optional<Review> isReview = reviewService.isReview(reviewUserId,userId);
        if (isReview.isPresent()) {
            return ResponseEntity.status(409).body(BaseResponseBody.of(404, "duplicatedReview"));
        }
        reviewService.reviewToUser(reviewUserId, userId, reviewPostReq.getReviewTxt());

        Optional<Review> review = reviewService.isReview(reviewUserId,userId);
        if (review.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity(HttpStatus.OK);
    }


    @PutMapping("/{email}")
    public ResponseEntity updateReview(Authentication authentication, @PathVariable String email, @RequestBody ReviewPostReq reviewPostReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        Long reviewUserId = userDetails.getUser().getId();
        Long userId = userService.getUserByEmail(email).getId();

        Optional<Review> review = reviewService.isReview(reviewUserId,userId);
        if (review.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        reviewService.updateReview(reviewUserId, userId, reviewPostReq.getReviewTxt());
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/{email}")
    public ResponseEntity deleteReview(Authentication authentication, @PathVariable String email) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        Long reviewUserId = userDetails.getUser().getId();
        Long userId = userService.getUserByEmail(email).getId();

        Optional<Review> review = reviewService.isReview(reviewUserId,userId);
        if (review.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        reviewService.deleteReview(reviewUserId, userId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/{email}")
    public ResponseEntity getReviewList(@PathVariable String email) {
        Long userId = userService.getUserByEmail(email).getId();
        List<Review> reviews = reviewService.getReviewList(userId);
        List<ReviewListRes> reviewList = new ArrayList<ReviewListRes>();
        for(Review item: reviews) {
            ReviewListRes reviewListRes = new ReviewListRes(item);
            Optional<User> user = userService.getUserById(item.getUserId());
            reviewListRes.setName(user.get().getName());
            reviewListRes.setEmail(user.get().getEmail());
            reviewList.add(reviewListRes);
        }
        return new ResponseEntity(reviewList,HttpStatus.OK);
    }

}
