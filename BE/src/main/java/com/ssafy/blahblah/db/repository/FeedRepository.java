package com.ssafy.blahblah.db.repository;

import com.ssafy.blahblah.db.entity.Feed;
import com.ssafy.blahblah.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedRepository extends JpaRepository<Feed,Long> {
    List<Feed> findByUserOrOpenTrue(User user);

}
