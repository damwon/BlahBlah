package com.ssafy.blahblah.api.controller.study;

import com.ssafy.blahblah.api.request.study.MemoReq;
import com.ssafy.blahblah.api.response.study.MemoDetailRes;
import com.ssafy.blahblah.api.response.study.MemoListRes;
import com.ssafy.blahblah.api.service.member.UserService;
import com.ssafy.blahblah.common.auth.SsafyUserDetails;
import com.ssafy.blahblah.db.entity.Memo;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.repository.MemoRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
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
@RequestMapping("/api/memo")
public class MemoController {

    @Autowired
    UserService userService;

    @Autowired
    MemoRepository memoRepository;

    @GetMapping
    public ResponseEntity memoList(Authentication authentication, Pageable pageable) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        List<Memo> memoList = memoRepository.findByUser(user,pageable).getContent();
        if (memoList == null || memoList.size() == 0) {
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
        List<MemoListRes> dto = memoList.stream().map(MemoListRes::fromEntity).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @GetMapping("/{memoId}")
    public ResponseEntity memoDetail(Authentication authentication, @PathVariable Long memoId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);

        Optional<Memo> option = memoRepository.findById(memoId);
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
        memoRepository.save(Memo.builder()
                .title(memoReq.getTitle())
                .content(memoReq.getContent())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .user(user)
                .build());
        return new ResponseEntity(HttpStatus.OK);

    }

    // user 사용하기
    @PutMapping("/{memoId}")
    public ResponseEntity memoUpdate(Authentication authentication, @PathVariable Long memoId, @RequestBody MemoReq memoReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        Optional<Memo> option = memoRepository.findById(memoId);
        if (option.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Memo memo = option.get();
        memo.setTitle(memoReq.getTitle());
        memo.setContent(memoReq.getContent());
        memo.setUpdatedAt(LocalDateTime.now());
        memoRepository.save(memo);
        return new ResponseEntity(HttpStatus.OK);
    }


    // user 사용하기
    @DeleteMapping("/{memoId}")
    public ResponseEntity memoDelete(Authentication authentication, @PathVariable Long memoId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        memoRepository.deleteById(memoId);
        return new ResponseEntity(HttpStatus.OK);
    }
}
