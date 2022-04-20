package com.ssafy.blahblah.db.repository;

import com.ssafy.blahblah.db.entity.Memo;
import com.ssafy.blahblah.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemoRepository extends JpaRepository<Memo,Long> {
    List<Memo> findByUser(User user);
    Optional<Memo> findById(Long id);
}
