package com.ssafy.blahblah.db.repository;

import com.ssafy.blahblah.db.entity.Qna;
import com.ssafy.blahblah.db.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QnaRepository extends JpaRepository<Qna, Long> {
    @Override
    Optional<Qna> findById(Long id);

    @Override
    Page<Qna> findAll(Pageable pageable);

    Page<Qna> findByUser(User user, Pageable pageable);
}
