package com.ssafy.blahblah.api.service.study;

import com.ssafy.blahblah.api.request.study.WordReq;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.entity.Word;
import com.ssafy.blahblah.db.entity.Wordbook;
import com.ssafy.blahblah.db.repository.WordRepository;
import com.ssafy.blahblah.db.repository.WordbookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class WordServiceImpl implements WordService{

    @Autowired
    WordRepository wordRepository;

    @Override
    public Word post(WordReq wordReq, User user, Wordbook wordbook) {
        return wordRepository.save(Word.builder()
                .word(wordReq.getWord())
                .meaning(wordReq.getMeaning())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .user(user)
                .wordbook(wordbook)
                .build());
    }

    @Override
    public Optional<Word> find(Long wordId){
        return wordRepository.findById(wordId);
    }

    @Override
    public Word update(WordReq wordReq, Word word) {
        word.setWord(wordReq.getWord());
        word.setMeaning(wordReq.getMeaning());
        word.setUpdatedAt(LocalDateTime.now());
        return wordRepository.save(word);
    }

    @Override
    public void delete(Long wordId) {
        wordRepository.deleteById(wordId);
    }
}
