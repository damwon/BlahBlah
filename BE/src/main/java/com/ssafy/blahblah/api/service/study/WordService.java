package com.ssafy.blahblah.api.service.study;

import com.ssafy.blahblah.api.request.study.WordReq;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.entity.Word;
import com.ssafy.blahblah.db.entity.Wordbook;

import java.util.Optional;

public interface WordService {
    Word post(WordReq wordReq, User user, Wordbook wordbook);

    Optional<Word> find(Long wordId);

    Word update(WordReq wordReq, Word word);

    void delete(Long wordId);
}
