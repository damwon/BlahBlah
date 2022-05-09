package com.ssafy.blahblah.db.repository;
import com.ssafy.blahblah.db.entity.Report;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report,Long> {

    @Override
    Page<Report> findAll(Pageable pageable);
}
