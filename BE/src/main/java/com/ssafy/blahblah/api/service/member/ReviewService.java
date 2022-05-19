package com.ssafy.blahblah.api.service.member;

import com.ssafy.blahblah.db.entity.Review;

import java.util.List;
import java.util.Optional;

public interface ReviewService {
    void reviewToUser(Long reviewUserId, Long userId, String reviewTxt);
    void updateReview(Long reviewUserId, Long userId, String reviewTxt);
    void deleteReview(Long reviewUserId, Long userId);
    Optional<Review> isReview(Long reviewUserId, Long userId);
    int countReview(Long userId);
    List<Review> getReviewList(Long userId);
}
