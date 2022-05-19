package com.ssafy.blahblah.api.service.feed;

import com.ssafy.blahblah.api.request.feed.FeedPostReq;
import com.ssafy.blahblah.db.entity.Feed;
import com.ssafy.blahblah.db.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FeedService {
    List<Feed> listForAll(User user);

    List<Feed> listForFriends(User user);

    Feed detail(Long feedId);

    Feed post(User user, String img, FeedPostReq feedPostReq);

    ResponseEntity update(User user, FeedPostReq feedPostReq, List<MultipartFile> multipartFile, Long feedId);

    ResponseEntity delete(User user, Long feedId);
}
