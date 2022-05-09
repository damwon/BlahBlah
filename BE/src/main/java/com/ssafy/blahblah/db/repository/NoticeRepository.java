package com.ssafy.blahblah.db.repository;

import com.ssafy.blahblah.db.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NoticeRepository extends JpaRepository<Notice,Long> {
    @Override
    Page<Notice> findAll(Pageable pageable);
    Optional<Notice> findById(Long id);
}
