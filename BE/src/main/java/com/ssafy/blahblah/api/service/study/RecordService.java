package com.ssafy.blahblah.api.service.study;

import com.ssafy.blahblah.api.request.study.RecordPostReq;
import com.ssafy.blahblah.db.entity.Record;
import com.ssafy.blahblah.db.entity.Recordbook;
import com.ssafy.blahblah.db.entity.User;

import java.util.Optional;

public interface RecordService {
    Optional<Record> find(Long recordId);

    void delete(Long recordId);

    Record post(User user, Recordbook recordbook, RecordPostReq recordPostReq);
}
