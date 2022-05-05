package com.ssafy.blahblah.api.service.member;

import com.ssafy.blahblah.db.entity.Rating;
import com.ssafy.blahblah.db.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RatingServiceImpl implements RatingService {
    @Autowired
    RatingRepository ratingRepository;

    @Override
    public void upRating(Long upUserId, Long userId) {
        Rating rating = new Rating();
        rating.setUpUserId(upUserId);
        rating.setUserId(userId);
        ratingRepository.save(rating);
    }

    @Override
    public void downRating(Long upUserId, Long userId) {
        ratingRepository.deleteByUpUserIdAndUserId(upUserId,userId);
    }

    @Override
    public Optional<Rating> isRating(Long upUserId, Long userId) {
        Optional<Rating> rating = ratingRepository.findByUpUserIdAndUserId(upUserId,userId);
        return rating;
    }

    @Override
    public int countRating(Long userId) {
        return ratingRepository.countByUserId(userId);
    }
}