package com.ssafy.blahblah.db.repository;

import com.ssafy.blahblah.db.entity.Recordbook;
import com.ssafy.blahblah.db.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecordbookRepository extends JpaRepository<Recordbook,Long> {
    Page<Recordbook> findByUser(User user, Pageable pageable);
    Optional<Recordbook> findById(Long id);
}
