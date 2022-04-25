package com.ssafy.blahblah.db.repository;

import com.ssafy.blahblah.db.entity.Memo;
import com.ssafy.blahblah.db.entity.Notice;
import com.ssafy.blahblah.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NoticeRepository extends JpaRepository<Notice,Long> {
    @Override
    List<Notice> findAll();
    Optional<Notice> findById(Long id);
}
