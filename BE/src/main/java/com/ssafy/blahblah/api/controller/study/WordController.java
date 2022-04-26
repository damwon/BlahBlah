package com.ssafy.blahblah.api.controller.study;

import com.ssafy.blahblah.api.request.study.WordReq;
import com.ssafy.blahblah.api.service.member.UserService;
import com.ssafy.blahblah.common.auth.SsafyUserDetails;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.entity.Word;
import com.ssafy.blahblah.db.entity.Wordbook;
import com.ssafy.blahblah.db.repository.WordRepository;
import com.ssafy.blahblah.db.repository.WordbookRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/word")
public class WordController {

    @Autowired
    UserService userService;

    @Autowired
    WordbookRepository wordbookRepository;

    @Autowired
    WordRepository wordRepository;

    @PostMapping("/{wordbookId}")
    public ResponseEntity wordPost(Authentication authentication,@PathVariable Long wordbookId, @RequestBody WordReq wordReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        Optional<Wordbook> option = wordbookRepository.findById(wordbookId);
        if (option.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Wordbook wordbook = option.get();
        wordRepository.save(Word.builder()
                .word(wordReq.getWord())
                .meaning(wordReq.getMeaning())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .user(user)
                .wordbook(wordbook)
                .build());
        return new ResponseEntity(HttpStatus.OK);

    }


    // user 사용하기
    @PutMapping("/{wordId}")
    public ResponseEntity wordbookUpdate(Authentication authentication,@PathVariable Long wordId, @RequestBody WordReq wordReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        Optional<Word> option = wordRepository.findById(wordId);
        if (option.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Word word = option.get();
        word.setWord(wordReq.getWord());
        word.setMeaning(wordReq.getMeaning());
        word.setUpdatedAt(LocalDateTime.now());
        wordRepository.save(word);
        return new ResponseEntity(HttpStatus.OK);
    }

    // user 사용하기
    @DeleteMapping("/{wordId}")
    public ResponseEntity wordbookDelete(Authentication authentication, @PathVariable Long wordId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        wordRepository.deleteById(wordId);
        return new ResponseEntity(HttpStatus.OK);
    }
}
