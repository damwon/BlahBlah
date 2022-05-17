package com.ssafy.blahblah.db.repository;

import com.ssafy.blahblah.db.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {
    Optional<Review> findByReviewUserIdAndUserId(Long reviewUserId, Long userId);
    List<Review> findAllByReviewUserId(Long reviewUserId);
    void deleteByReviewUserIdAndUserId(Long reviewUserId, Long userId);
    int countByUserId(Long userId);
}
