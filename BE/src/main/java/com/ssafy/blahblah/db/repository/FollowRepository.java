package com.ssafy.blahblah.db.repository;

import com.ssafy.blahblah.db.entity.Follow;
import com.ssafy.blahblah.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow,Long> {
    Optional<Follow> findByToUserAndFromUser(User toUser, User fromUser);

    List<Follow> findAllByFromUser(User fromUser);
}
