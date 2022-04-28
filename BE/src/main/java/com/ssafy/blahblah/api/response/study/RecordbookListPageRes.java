package com.ssafy.blahblah.api.response.study;

import com.ssafy.blahblah.db.entity.Recordbook;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class RecordbookListPageRes {
    private List<RecordbookListRes> recordbookListRes;
    private int totalPages;

    public RecordbookListPageRes(Page<Recordbook> recordbooks){
        this.recordbookListRes = recordbooks.stream().map(RecordbookListRes::fromEntity).collect(Collectors.toList());
        this.totalPages = recordbooks.getTotalPages();
    }
}
