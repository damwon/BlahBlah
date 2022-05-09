package com.ssafy.blahblah.db.repository;

import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.entity.Word;
import com.ssafy.blahblah.db.entity.Wordbook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WordRepository extends JpaRepository<Word,Long> {

    @Override
    Optional<Word> findById(Long id);


    Page<Word> findByWordbook(Wordbook wordbook, Pageable pageable);
}
