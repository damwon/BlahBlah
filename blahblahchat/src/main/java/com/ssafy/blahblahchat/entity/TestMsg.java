package com.ssafy.blahblahchat.entity;


import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.time.LocalDateTime;


@Document(collection="msg")
@Data
public class TestMsg {

    @Id
    String id;
    String senderId;
    String receiverId;
    String content;
    LocalDateTime createdAt;

}
