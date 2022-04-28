package com.ssafy.blahblah.api.response.study;

import com.ssafy.blahblah.db.entity.Memo;
import com.ssafy.blahblah.db.entity.Word;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class MemoListPageRes {
    private List<MemoListRes> memoListRes;
    private int totalPages;

    public MemoListPageRes(Page<Memo> memoList){
        this.memoListRes = memoList.stream().map(MemoListRes::fromEntity).collect(Collectors.toList());
        this.totalPages = memoList.getTotalPages();
    }
}
