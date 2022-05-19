package com.ssafy.blahblah.db.repository;

import com.ssafy.blahblah.db.entity.Feed;
import com.ssafy.blahblah.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedRepository extends JpaRepository<Feed,Long> {
    List<Feed> findByUserOrOpenTrue(User user);
    List<Feed> findAllByUser(User user);
    List<Feed> findByUserAndOpenFalse(User user);

}
