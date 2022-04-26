package com.ssafy.blahblah.db.repository;

import com.ssafy.blahblah.db.entity.Qna;
import com.ssafy.blahblah.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QnaRepository extends JpaRepository<Qna, Long> {
    @Override
    Optional<Qna> findById(Long id);

    @Override
    List<Qna> findAll();

    List<Qna> findByUser(User user);
}
