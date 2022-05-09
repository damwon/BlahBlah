package com.ssafy.blahblah.api.service.study;

import com.ssafy.blahblah.api.request.study.MemoReq;
import com.ssafy.blahblah.db.entity.Memo;
import com.ssafy.blahblah.db.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface MemoService {
    Page<Memo> memoList(Pageable pageable, User user);

    Optional<Memo> memoDetail(Long memoId);

    Memo memoPost(User user, MemoReq memoReq);

    Memo memoUpdate(MemoReq memoReq, Memo memo);

    Memo memoDelete(Long memoId);
}
