package com.ssafy.blahblah.db.repository;

import com.ssafy.blahblah.db.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
