package com.ssafy.blahblah.api.controller.study;

import com.ssafy.blahblah.api.request.study.RecordPostReq;
import com.ssafy.blahblah.api.service.member.UserService;
import com.ssafy.blahblah.api.service.study.RecordService;
import com.ssafy.blahblah.api.service.study.RecordbookService;
import com.ssafy.blahblah.common.auth.SsafyUserDetails;
import com.ssafy.blahblah.db.entity.Record;
import com.ssafy.blahblah.db.entity.Recordbook;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.repository.RecordRepository;
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
@RequestMapping("/api/record")
public class RecordController {

    @Autowired
    UserService userService;


    @Autowired
    RecordService recordService;

    @Autowired
    RecordbookService recordbookService;

    @PostMapping("/{recordbookId}")
    public ResponseEntity recordPost(Authentication authentication, @PathVariable Long recordbookId, @RequestBody RecordPostReq recordPostReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        Optional<Recordbook> option = recordbookService.recordlist(recordbookId);
        if (option.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        Recordbook recordbook = option.get();
        if(recordbook.getUser().equals(user)){
            recordService.post(user,recordbook,recordPostReq);
            return new ResponseEntity(HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("자신이 작성한 음성메모가 아닙니다.");
    }

    @DeleteMapping("/{recordId}")
    public ResponseEntity recordbookDelete(Authentication authentication, @PathVariable Long recordId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        Optional<Record> option = recordService.find(recordId);
        if (option.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Record record = option.get();
        if(record.getUser().equals(user)){
            recordService.delete(recordId);
            return new ResponseEntity(HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("자신이 작성한 음성메모가 아닙니다.");

    }
}
