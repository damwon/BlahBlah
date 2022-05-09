package com.ssafy.blahblah.api.service.member;

import com.ssafy.blahblah.db.entity.Rating;

import java.util.Optional;

public interface RatingService {
    void upRating(Long upUserId, Long userId);
    void downRating(Long upUserId, Long userId);
    Optional<Rating> isRating(Long upUserId, Long userId);
    int countRating(Long userId);
}
