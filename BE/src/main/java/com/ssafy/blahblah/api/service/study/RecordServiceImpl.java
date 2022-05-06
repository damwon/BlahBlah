package com.ssafy.blahblah.api.service.study;

import com.ssafy.blahblah.db.entity.Record;
import com.ssafy.blahblah.db.repository.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RecordServiceImpl implements RecordService{

    @Autowired
    RecordRepository recordRepository;

    @Override
    public Optional<Record> find(Long recordId) {
        return recordRepository.findById(recordId);
    }

    @Override
    public void delete(Long recordId) {
        recordRepository.deleteById(recordId);
    }
}
