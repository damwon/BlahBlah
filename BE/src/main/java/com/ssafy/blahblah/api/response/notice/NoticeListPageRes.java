package com.ssafy.blahblah.api.response.notice;

import com.ssafy.blahblah.api.response.study.MemoListRes;
import com.ssafy.blahblah.db.entity.Memo;
import com.ssafy.blahblah.db.entity.Notice;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class NoticeListPageRes {
    private List<NoticeListRes> noticeListRes;
    private int totalPages;

    public NoticeListPageRes(Page<Notice> noticeList){
        this.noticeListRes = noticeList.stream().map(NoticeListRes::fromEntity).collect(Collectors.toList());
        this.totalPages = noticeList.getTotalPages();
    }
}
