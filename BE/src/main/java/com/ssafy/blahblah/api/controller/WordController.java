package com.ssafy.blahblah.api.controller;

import com.ssafy.blahblah.api.response.WordListRes;
import com.ssafy.blahblah.api.service.UserService;
import com.ssafy.blahblah.common.auth.SsafyUserDetails;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.entity.Wordbook;
import com.ssafy.blahblah.db.repository.WordbookRepository;
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
@RequestMapping("api/v1/word")
public class WordController {

    @Autowired
    UserService userService;

    @Autowired
    WordbookRepository wordbookRepository;


    // findby외래키로 찾을지 findbyWordbookId로 찾아서 DTO로 커스터마이징할지 뭐가 더 효율적일까?
    @GetMapping("/wordbookId}")
    public ResponseEntity wordlist(Authentication authentication, @PathVariable Long wordbookId){
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        Optional<Wordbook> optionalWordbook = wordbookRepository.findById(wordbookId);
        if(optionalWordbook.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Wordbook wordbook = optionalWordbook.get();

        return ResponseEntity.status(HttpStatus.OK).body(new WordListRes(wordbook));


    }


}
