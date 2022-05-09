package com.ssafy.blahblah.api.controller.study;

import com.ssafy.blahblah.api.request.study.MemoReq;
import com.ssafy.blahblah.api.response.study.MemoDetailRes;
import com.ssafy.blahblah.api.response.study.MemoListPageRes;
import com.ssafy.blahblah.api.service.member.UserService;
import com.ssafy.blahblah.api.service.study.MemoService;
import com.ssafy.blahblah.common.auth.SsafyUserDetails;
import com.ssafy.blahblah.db.entity.Memo;
import com.ssafy.blahblah.db.entity.User;
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
@RequestMapping("/api/memo")
public class MemoController {

    @Autowired
    UserService userService;

    @Autowired
    MemoService memoService;

    @GetMapping
    public ResponseEntity memoList(Authentication authentication, Pageable pageable) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        Page<Memo> memoList = memoService.memoList(pageable,user);
        if (memoList == null || memoList.getContent().size() == 0) {
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(new MemoListPageRes(memoList));
    }

    @GetMapping("/{memoId}")
    public ResponseEntity memoDetail(Authentication authentication, @PathVariable Long memoId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);

        Optional<Memo> option = memoService.memoDetail(memoId);
        if (option.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Memo memo = option.get();
        if (memo.getUser().equals(user)) {
            return ResponseEntity.status(HttpStatus.OK).body(new MemoDetailRes(memo));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("자신이 작성한 메모가 아닙니다.");


    }

    @PostMapping
    public ResponseEntity memoPost(Authentication authentication, @RequestBody MemoReq memoReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        memoService.memoPost(user,memoReq);
        return new ResponseEntity(HttpStatus.OK);

    }

    @PutMapping("/{memoId}")
    public ResponseEntity memoUpdate(Authentication authentication, @PathVariable Long memoId, @RequestBody MemoReq memoReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);

        Optional<Memo> option = memoService.memoDetail(memoId);
        if (option.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        Memo memo = option.get();
        if (memo.getUser().equals(user)) {
            memoService.memoUpdate(memoReq,memo);
            return new ResponseEntity(HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("자신이 작성한 메모가 아닙니다.");

    }


    @DeleteMapping("/{memoId}")
    public ResponseEntity memoDelete(Authentication authentication, @PathVariable Long memoId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        Optional<Memo> option = memoService.memoDetail(memoId);
        if (option.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Memo memo = option.get();
        if (memo.getUser().equals(user)) {
            memoService.memoDelete(memoId);
            return new ResponseEntity(HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("자신이 작성한 메모가 아닙니다.");

    }
}
