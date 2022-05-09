package com.ssafy.blahblah.api.service.study;

import com.ssafy.blahblah.api.request.study.WordbookReq;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.entity.Word;
import com.ssafy.blahblah.db.entity.Wordbook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface WordbookService {
    Page<Wordbook> list(User user, Pageable pageable);

    Optional<Wordbook> wordlist(Long wordbookId);

    Page<Word> wordlist2(Wordbook wordbook, Pageable pageable);

    Wordbook post(User user, WordbookReq wordbookReq);

    Wordbook update(Wordbook wordbook, WordbookReq wordbookReq);

    void delete(Long wordbookId);
}
