package com.ssafy.blahblah.db.repository;

import com.ssafy.blahblah.db.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WordRepository extends JpaRepository<Word,Long> {

    @Override
    Optional<Word> findById(Long id);
}
