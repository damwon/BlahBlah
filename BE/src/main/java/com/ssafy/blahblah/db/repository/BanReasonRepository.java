package com.ssafy.blahblah.db.repository;

import com.ssafy.blahblah.db.entity.BanReason;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BanReasonRepository extends JpaRepository<BanReason,Long> {
}
