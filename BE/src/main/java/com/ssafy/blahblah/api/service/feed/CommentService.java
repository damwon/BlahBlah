package com.ssafy.blahblah.api.service.feed;

import com.ssafy.blahblah.api.request.feed.CommentPostReq;
import com.ssafy.blahblah.db.entity.Comment;
import com.ssafy.blahblah.db.entity.User;
import org.springframework.http.ResponseEntity;

public interface CommentService {
    Comment post(User user, Long feedId, CommentPostReq commentPostReq);
    ResponseEntity delete(Long commentId, User user);
}
