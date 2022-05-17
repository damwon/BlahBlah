package com.ssafy.blahblah.api.service.member;

import com.ssafy.blahblah.db.entity.Review;
import com.ssafy.blahblah.db.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewServiceImpl implements ReviewService {
    @Autowired
    ReviewRepository reviewRepository;

    @Override
    public void reviewToUser(Long reviewUserId, Long userId, String reviewTxt) {
        Review review = new Review(reviewUserId, userId, reviewTxt, LocalDateTime.now());
        reviewRepository.save(review);
    }

    @Override
    public void updateReview(Long reviewUserId, Long userId, String reviewTxt) {
        Optional<Review> review = reviewRepository.findByReviewUserIdAndUserId(reviewUserId, userId);
        review.get().setReviewTxt(reviewTxt);
        review.get().setCreatedAt(LocalDateTime.now());
        reviewRepository.save(review.get());
    }

    @Override
    public void deleteReview(Long reviewUserId, Long userId) {
        reviewRepository.deleteByReviewUserIdAndUserId(reviewUserId,userId);
    }

    @Override
    public Optional<Review> isReview(Long reviewUserId, Long userId) {
        Optional<Review> review = reviewRepository.findByReviewUserIdAndUserId(reviewUserId,userId);
        return review;
    }

    @Override
    public int countReview(Long userId) {
        return reviewRepository.countByUserId(userId);
    }

    @Override
    public List<Review> getReviewList(Long userId) { return reviewRepository.findAllByReviewUserId(userId);}
}