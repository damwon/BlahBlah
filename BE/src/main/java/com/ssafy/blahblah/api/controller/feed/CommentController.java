package com.ssafy.blahblah.api.controller.feed;

import com.ssafy.blahblah.api.request.feed.CommentPostReq;
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
    FeedRepository feedRepository;

    @Autowired
    CommentRepository commentRepository;

    @PostMapping("/{feedId}")
    public ResponseEntity post(Authentication authentication, @PathVariable Long feedId, @RequestBody CommentPostReq commentPostReq){
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        Optional<Feed> option = feedRepository.findById(feedId);
        if (option.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        Feed feed = option.get();

        commentRepository.save(Comment.builder()
                .content(commentPostReq.getContent())
                .createdAt(LocalDateTime.now())
                .user(user)
                .feed(feed)
                .build());
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity delete(Authentication authentication, @PathVariable Long commentId){
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByEmail(userId);
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        if (optionalComment.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }

        Comment comment = optionalComment.get();
        if (!comment.getUser().equals(user)) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }

        commentRepository.deleteById(commentId);
        return new ResponseEntity(HttpStatus.OK);
    }
}
