package com.ssafy.blahblah.api.controller.feed;

import com.ssafy.blahblah.api.request.feed.CommentPostReq;
import com.ssafy.blahblah.api.service.feed.CommentService;
import com.ssafy.blahblah.api.service.member.UserService;
import com.ssafy.blahblah.common.auth.SsafyUserDetails;
import com.ssafy.blahblah.db.entity.Comment;
import com.ssafy.blahblah.db.entity.Feed;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.repository.CommentRepository;
import com.ssafy.blahblah.db.repository.FeedRepository;
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
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    UserService userService;

    @Autowired
    CommentService commentService;

    @PostMapping("/{feedId}")
    public ResponseEntity post(Authentication authentication, @PathVariable Long feedId, @RequestBody CommentPostReq commentPostReq){
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        Comment comment = commentService.post(user,feedId,commentPostReq);

        if (comment == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity(HttpStatus.OK);

    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity delete(Authentication authentication, @PathVariable Long commentId){
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        return commentService.delete(commentId,user);
    }
}
