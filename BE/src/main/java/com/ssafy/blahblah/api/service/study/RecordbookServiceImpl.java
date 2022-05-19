package com.ssafy.blahblah.api.service.study;

import com.ssafy.blahblah.api.request.study.RecordbookReq;
import com.ssafy.blahblah.db.entity.Record;
import com.ssafy.blahblah.db.entity.Recordbook;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.repository.RecordRepository;
import com.ssafy.blahblah.db.repository.RecordbookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class RecordbookServiceImpl implements RecordbookService{

    @Autowired
    RecordbookRepository recordbookRepository;

    @Autowired
    RecordRepository recordRepository;

    @Override
    public Page<Recordbook> list(Pageable pageable, User user) {
        return recordbookRepository.findByUser(user,pageable);
    }

    @Override
    public Optional<Recordbook> recordlist(Long recordbookId) {
        return recordbookRepository.findById(recordbookId);
    }

    @Override
    public Page<Record> recordList2(Recordbook recordbook, Pageable pageable){
        return recordRepository.findByRecordbook(recordbook, pageable);
    }

    @Override
    public Recordbook recordbookPost(User user, RecordbookReq recordbookReq) {
        return recordbookRepository.save(Recordbook.builder()
                .title(recordbookReq.getTitle())
                .createdAt(LocalDateTime.now())
                .user(user)
                .build());
    }

    @Override
    public Recordbook recordbookUpdate(Recordbook recordbook, RecordbookReq recordbookReq){
        recordbook.setTitle(recordbookReq.getTitle());
        return recordbookRepository.save(recordbook);
    }

    @Override
    public Object recordbookDelete(Long recordbookId) {
        recordbookRepository.deleteById(recordbookId);
        return null;
    }
}
