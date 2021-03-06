package com.ssafy.blahblah.api.response.study;

import com.ssafy.blahblah.db.entity.Record;
import com.ssafy.blahblah.db.entity.Recordbook;
import com.ssafy.blahblah.db.entity.Word;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class RecordListPageRes {
    private List<RecordListRes> recordListRes;
    private int totalPages;
    private String recordBookTitle;

    public RecordListPageRes(Page<Record> records, Recordbook recordbook){
        this.recordListRes = records.stream().map(RecordListRes::fromEntity).collect(Collectors.toList());
        this.totalPages = records.getTotalPages();
        this.recordBookTitle = recordbook.getTitle();
    }
}
