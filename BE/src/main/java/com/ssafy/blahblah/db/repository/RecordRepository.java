package com.ssafy.blahblah.db.repository;

import com.ssafy.blahblah.db.entity.Record;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordRepository extends JpaRepository<Record,Long> {
}
