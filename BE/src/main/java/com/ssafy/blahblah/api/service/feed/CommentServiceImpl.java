package com.ssafy.blahblah.api.service.feed;

import com.ssafy.blahblah.api.request.feed.CommentPostReq;
import com.ssafy.blahblah.db.entity.Comment;
import com.ssafy.blahblah.db.entity.Feed;
import com.ssafy.blahblah.db.entity.User;
import com.ssafy.blahblah.db.repository.CommentRepository;
import com.ssafy.blahblah.db.repository.FeedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;




@Service
public class CommentServiceImpl implements CommentService{

    @Autowired
    FeedRepository feedRepository;

    @Autowired
    CommentRepository commentRepository;

    @Override
    public Comment post(User user, Long feedId, CommentPostReq commentPostReq) {
        Optional<Feed> option = feedRepository.findById(feedId);
        if (option.isEmpty()) {
            return null;
        }
        Feed feed = option.get();
        return commentRepository.save(Comment.builder()
                .content(commentPostReq.getContent())
                .createdAt(LocalDateTime.now())
                .user(user)
                .feed(feed)
                .build());

    }

    @Override
    public ResponseEntity delete(Long commentId, User user) {
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
