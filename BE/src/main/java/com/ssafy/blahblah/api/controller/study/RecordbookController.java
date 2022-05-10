package com.ssafy.blahblah.api.controller.study;



import com.ssafy.blahblah.api.request.study.RecordbookReq;
import com.ssafy.blahblah.api.response.study.RecordListPageRes;
import com.ssafy.blahblah.api.response.study.RecordbookListPageRes;
import com.ssafy.blahblah.api.service.member.UserService;
import com.ssafy.blahblah.api.service.study.RecordbookService;
import com.ssafy.blahblah.common.auth.SsafyUserDetails;
import com.ssafy.blahblah.db.entity.*;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/recordbook")
public class RecordbookController {

    @Autowired
    UserService userService;

    @Autowired
    RecordbookService recordbookService;

    @GetMapping
    public ResponseEntity list(Authentication authentication, Pageable pageable) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        Page<Recordbook> recordbooks = recordbookService.list(pageable,user);
        if (recordbooks == null || recordbooks.getContent().size() == 0) {
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(new RecordbookListPageRes(recordbooks));
    }

    @GetMapping("/{recordbookId}")
    public ResponseEntity recordlist(Authentication authentication, @PathVariable Long recordbookId, Pageable pageable){
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        Optional<Recordbook> optionalRecordbook = recordbookService.recordlist(recordbookId);
        if(optionalRecordbook.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Recordbook recordbook = optionalRecordbook.get();
        Page<Record> records = recordbookService.recordList2(recordbook,pageable);

        return ResponseEntity.status(HttpStatus.OK).body(new RecordListPageRes(records,recordbook));


    }

    @PostMapping
    public ResponseEntity recordbookPost(Authentication authentication, @RequestBody RecordbookReq recordbookReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        recordbookService.recordbookPost(user,recordbookReq);
        return new ResponseEntity(HttpStatus.OK);

    }

    // user 사용하기
    @PutMapping("/{recordbookId}")
    public ResponseEntity recordbookUpdate(Authentication authentication,@PathVariable Long recordbookId, @RequestBody RecordbookReq recordbookReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        Optional<Recordbook> option = recordbookService.recordlist(recordbookId);
        if (option.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Recordbook recordbook = option.get();
        if(recordbook.getUser().equals(user)) {
            recordbookService.recordbookUpdate(recordbook,recordbookReq);
            return new ResponseEntity(HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("자신이 작성한 음성메모장이 아닙니다.");

    }


    // user 사용하기
    @DeleteMapping("/{recordbookId}")
    public ResponseEntity recordbookDelete(Authentication authentication, @PathVariable Long recordbookId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        Optional<Recordbook> option = recordbookService.recordlist(recordbookId);
        if (option.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Recordbook recordbook = option.get();
        if(recordbook.getUser().equals(user)){
            recordbookService.recordbookDelete(recordbookId);
            return new ResponseEntity(HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("자신이 작성한 음성메모장가 아닙니다.");
    }


}
