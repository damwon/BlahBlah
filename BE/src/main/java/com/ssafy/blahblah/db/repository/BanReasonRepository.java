package com.ssafy.blahblah.db.repository;

import com.ssafy.blahblah.db.entity.BanReason;
import com.ssafy.blahblah.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BanReasonRepository extends JpaRepository<BanReason,Long> {

    List<BanReason> findAllByUser(User user);
}
