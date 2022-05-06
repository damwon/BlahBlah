package com.ssafy.blahblah.api.service.study;

import com.ssafy.blahblah.api.request.study.MemoReq;
import com.ssafy.blahblah.db.entity.Memo;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.repository.MemoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class MemoServiceImpl implements MemoService{

    @Autowired
    MemoRepository memoRepository;

    @Override
    public Page<Memo> memoList(Pageable pageable, User user) {
        return memoRepository.findByUser(user,pageable);
    }

    @Override
    public Optional<Memo> memoDetail(Long memoId){
        return memoRepository.findById(memoId);
    }

    @Override
    public Memo memoPost(User user, MemoReq memoReq) {
        return memoRepository.save(Memo.builder()
                .title(memoReq.getTitle())
                .content(memoReq.getContent())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .user(user)
                .build());
    }

    @Override
    public Memo memoUpdate(MemoReq memoReq, Memo memo) {
        memo.setTitle(memoReq.getTitle());
        memo.setContent(memoReq.getContent());
        memo.setUpdatedAt(LocalDateTime.now());
       return memoRepository.save(memo);
    }

    @Override
    public Memo memoDelete(Long memoId){
        memoRepository.deleteById(memoId);
        return null;
    }
}
