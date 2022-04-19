package com.ssafy.blahblah.api.controller;

import com.ssafy.blahblah.api.request.WordbookReq;
import com.ssafy.blahblah.api.response.WordbookListRes;
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

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("api/v1/wordbook")
public class WordbookContorller {

    @Autowired
    WordbookRepository wordbookRepository;

    @Autowired
    UserService userService;

    @GetMapping
    public ResponseEntity list( Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        List<Wordbook> wordbookList = wordbookRepository.findByUser(user);
        if (wordbookList == null || wordbookList.size() == 0) {
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
        List<WordbookListRes> dto = wordbookList.stream().map(WordbookListRes::fromEntity).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @PostMapping
    public ResponseEntity wordbookPost(Authentication authentication, @RequestBody WordbookReq wordbookReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        wordbookRepository.save(Wordbook.builder()
                .title(wordbookReq.getTitle())
                .createdAt(LocalDateTime.now())
                .user(user)
                .build());
        return new ResponseEntity(HttpStatus.OK);

    }

    @PutMapping("/{wordbookId}")
    public ResponseEntity wordbookUpdate(Authentication authentication,@PathVariable Long wordbookId, @RequestBody WordbookReq wordbookReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        Optional<Wordbook> option = wordbookRepository.findById(wordbookId);
        if (option.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Wordbook wordbook = option.get();
        wordbook.setTitle(wordbookReq.getTitle());
        wordbookRepository.save(wordbook);
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/{wordbookId}")
    public ResponseEntity wordbookDelete(Authentication authentication, @PathVariable Long wordbookId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        wordbookRepository.deleteById(wordbookId);
        return new ResponseEntity(HttpStatus.OK);
    }




}
