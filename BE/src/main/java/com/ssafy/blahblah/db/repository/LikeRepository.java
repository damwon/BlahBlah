package com.ssafy.blahblah.db.repository;

import com.ssafy.blahblah.db.entity.Feed;
import com.ssafy.blahblah.db.entity.Heart;
import com.ssafy.blahblah.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Heart,Long> {

    Optional<Heart> findByUserAndFeed(User user, Feed feed);
}
