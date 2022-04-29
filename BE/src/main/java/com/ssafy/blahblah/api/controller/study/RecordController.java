package com.ssafy.blahblah.api.controller.study;

import com.ssafy.blahblah.api.service.member.UserService;
import com.ssafy.blahblah.common.auth.SsafyUserDetails;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.repository.RecordRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/record")
public class RecordController {

    @Autowired
    UserService userService;

    @Autowired
    RecordRepository recordRepository;

    // user 사용하기
    @DeleteMapping("/{recordId}")
    public ResponseEntity recordbookDelete(Authentication authentication, @PathVariable Long recordId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        recordRepository.deleteById(recordId);
        return new ResponseEntity(HttpStatus.OK);
    }
}
