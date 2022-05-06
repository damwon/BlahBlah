package com.ssafy.blahblah.api.service.study;

import com.ssafy.blahblah.api.request.study.RecordbookReq;
import com.ssafy.blahblah.db.entity.Record;
import com.ssafy.blahblah.db.entity.Recordbook;
import com.ssafy.blahblah.db.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface RecordbookService {
    Page<Recordbook> list(Pageable pageable, User user);

    Optional<Recordbook> recordlist(Long recordbookId);

    Page<Record> recordList2(Recordbook recordbook, Pageable pageable);

    Recordbook recordbookPost(User user, RecordbookReq recordbookReq);


    Recordbook recordbookUpdate(Recordbook recordbook, RecordbookReq recordbookReq);

    Object recordbookDelete(Long recordbookId);
}
