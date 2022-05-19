package com.ssafy.blahblah.db.repository;

import com.ssafy.blahblah.db.entity.Record;
import com.ssafy.blahblah.db.entity.Recordbook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecordRepository extends JpaRepository<Record,Long> {

    @Override
    Optional<Record> findById(Long id);


    Page<Record> findByRecordbook(Recordbook recordbook, Pageable pageable);
}
