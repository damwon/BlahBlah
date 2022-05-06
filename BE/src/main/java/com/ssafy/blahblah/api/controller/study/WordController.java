package com.ssafy.blahblah.api.controller.study;

import com.ssafy.blahblah.api.request.study.WordReq;
import com.ssafy.blahblah.api.service.member.UserService;
import com.ssafy.blahblah.api.service.study.WordService;
import com.ssafy.blahblah.api.service.study.WordbookService;
import com.ssafy.blahblah.common.auth.SsafyUserDetails;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.entity.Word;
import com.ssafy.blahblah.db.entity.Wordbook;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/word")
public class WordController {

    @Autowired
    UserService userService;

    @Autowired
    WordbookService wordbookService;

    @Autowired
    WordService wordService;

    @PostMapping("/{wordbookId}")
    public ResponseEntity wordPost(Authentication authentication,@PathVariable Long wordbookId, @RequestBody WordReq wordReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        Optional<Wordbook> option = wordbookService.wordlist(wordbookId);
        if (option.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Wordbook wordbook = option.get();
        wordService.post(wordReq,user,wordbook);
        return new ResponseEntity(HttpStatus.OK);

    }


    // user 사용하기
    @PutMapping("/{wordId}")
    public ResponseEntity wordbookUpdate(Authentication authentication,@PathVariable Long wordId, @RequestBody WordReq wordReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        Optional<Word> option = wordService.find(wordId);
        if (option.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Word word = option.get();
        if(word.getUser().equals(user)){
            wordService.update(wordReq,word);
            return new ResponseEntity(HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("자신이 작성한 단어가 아닙니다.");

    }


    @DeleteMapping("/{wordId}")
    public ResponseEntity wordbookDelete(Authentication authentication, @PathVariable Long wordId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        Optional<Word> option = wordService.find(wordId);
        if (option.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Word word = option.get();
        if(word.getUser().equals(user)){
            wordService.delete(wordId);
            return new ResponseEntity(HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("자신이 작성한 단어가 아닙니다.");

    }
}
