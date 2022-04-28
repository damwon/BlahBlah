package com.ssafy.blahblah.api.response.notice;

import com.ssafy.blahblah.db.entity.Notice;
import com.ssafy.blahblah.db.entity.Qna;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class MyQnaListPageRes {
    private List<MyQnaListRes> myQnaListRes;
    private int totalPages;

    public MyQnaListPageRes(Page<Qna> qnaList){
        this.myQnaListRes = qnaList.stream().map(MyQnaListRes::fromEntity).collect(Collectors.toList());
        this.totalPages = qnaList.getTotalPages();
    }
}
