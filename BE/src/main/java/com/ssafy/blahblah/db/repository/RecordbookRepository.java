package com.ssafy.blahblah.db.repository;

import com.ssafy.blahblah.db.entity.Recordbook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordbookRepository extends JpaRepository<Recordbook,Long> {
}
