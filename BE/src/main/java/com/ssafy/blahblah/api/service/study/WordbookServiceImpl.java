package com.ssafy.blahblah.api.service.study;

import com.ssafy.blahblah.api.request.study.WordbookReq;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.entity.Word;
import com.ssafy.blahblah.db.entity.Wordbook;
import com.ssafy.blahblah.db.repository.WordRepository;
import com.ssafy.blahblah.db.repository.WordbookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class WordbookServiceImpl implements WordbookService{
    @Autowired
    WordbookRepository wordbookRepository;

    @Autowired
    WordRepository wordRepository;

    @Override
    public Page<Wordbook> list(User user, Pageable pageable) {
        return wordbookRepository.findByUser(user,pageable);
    }

    @Override
    public Optional<Wordbook> wordlist(Long wordbookId) {
        return wordbookRepository.findById(wordbookId);
    }

    @Override
    public  Page<Word> wordlist2(Wordbook wordbook, Pageable pageable){
        return wordRepository.findByWordbook(wordbook, pageable);
    }

    @Override
    public Wordbook post(User user, WordbookReq wordbookReq){
        return  wordbookRepository.save(Wordbook.builder()
                .title(wordbookReq.getTitle())
                .createdAt(LocalDateTime.now())
                .user(user)
                .build());
    }

    @Override
    public Wordbook update(Wordbook wordbook, WordbookReq wordbookReq){
        wordbook.setTitle(wordbookReq.getTitle());
        return wordbookRepository.save(wordbook);
    }

    @Override
    public void delete(Long wordbookId) {
        wordbookRepository.deleteById(wordbookId);
    }

}
