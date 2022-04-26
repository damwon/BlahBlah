package com.ssafy.blahblahchat.entity;


import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.time.LocalDateTime;


@Document(collection="chat")
@Data
public class Message {

    @Id
    String id;
    String senderId;
    String receiverId;
    String content;
    String roomId;
    LocalDateTime createdAt;

}
