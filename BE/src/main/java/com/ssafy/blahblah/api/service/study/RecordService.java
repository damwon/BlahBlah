package com.ssafy.blahblah.api.service.study;

import com.ssafy.blahblah.db.entity.Record;

import java.util.Optional;

public interface RecordService {
    Optional<Record> find(Long recordId);

    void delete(Long recordId);
}
