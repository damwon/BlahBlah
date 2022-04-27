package com.ssafy.blahblah.db.repository;

import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.entity.Wordbook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WordbookRepository extends JpaRepository<Wordbook,Long> {
    Page<Wordbook> findByUser(User user, Pageable pageable);
    Optional<Wordbook> findById(Long id);
}
