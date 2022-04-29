package com.ssafy.blahblah.api.controller.study;

import com.ssafy.blahblah.api.request.study.WordbookReq;
import com.ssafy.blahblah.api.response.study.WordListPageRes;
import com.ssafy.blahblah.api.response.study.WordbookListPageRes;
import com.ssafy.blahblah.api.service.member.UserService;
import com.ssafy.blahblah.common.auth.SsafyUserDetails;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.entity.Word;
import com.ssafy.blahblah.db.entity.Wordbook;
import com.ssafy.blahblah.db.repository.WordRepository;
import com.ssafy.blahblah.db.repository.WordbookRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/wordbook")
public class WordbookController {

    @Autowired
    WordbookRepository wordbookRepository;

    @Autowired
    WordRepository wordRepository;

    @Autowired
    UserService userService;

    @GetMapping
    public ResponseEntity list( Authentication authentication,Pageable pageable) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        Page<Wordbook> wordbooks = wordbookRepository.findByUser(user,pageable);
        if (wordbooks == null || wordbooks.getContent().size() == 0) {
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(new WordbookListPageRes(wordbooks));
    }

    // findby외래키로 찾을지 findbyWordbookId로 찾아서 DTO로 커스터마이징할지 뭐가 더 효율적일까?
    @GetMapping("/{wordbookId}")
    public ResponseEntity wordlist(Authentication authentication, @PathVariable Long wordbookId, Pageable pageable){
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        Optional<Wordbook> optionalWordbook = wordbookRepository.findById(wordbookId);
        if(optionalWordbook.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Wordbook wordbook = optionalWordbook.get();
        Page<Word> words = wordRepository.findByWordbook(wordbook, pageable);

        return ResponseEntity.status(HttpStatus.OK).body(new WordListPageRes(words));


    }

    @PostMapping
    public ResponseEntity wordbookPost(Authentication authentication, @RequestBody WordbookReq wordbookReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        wordbookRepository.save(Wordbook.builder()
                .title(wordbookReq.getTitle())
                .createdAt(LocalDateTime.now())
                .user(user)
                .build());
        return new ResponseEntity(HttpStatus.OK);

    }

    // user 사용하기
    @PutMapping("/{wordbookId}")
    public ResponseEntity wordbookUpdate(Authentication authentication,@PathVariable Long wordbookId, @RequestBody WordbookReq wordbookReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        Optional<Wordbook> option = wordbookRepository.findById(wordbookId);
        if (option.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Wordbook wordbook = option.get();
        wordbook.setTitle(wordbookReq.getTitle());
        wordbookRepository.save(wordbook);
        return new ResponseEntity(HttpStatus.OK);
    }


    // user 사용하기
    @DeleteMapping("/{wordbookId}")
    public ResponseEntity wordbookDelete(Authentication authentication, @PathVariable Long wordbookId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        wordbookRepository.deleteById(wordbookId);
        return new ResponseEntity(HttpStatus.OK);
    }




}
