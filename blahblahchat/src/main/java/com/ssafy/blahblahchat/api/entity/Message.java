package com.ssafy.blahblahchat.api.entity;


import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.time.LocalDateTime;


@Document(collection="message")
@Data
public class Message {

    @Id
    String id;
    String type;//text,image,voice
    String senderId;
    String senderName;
    String receiverId;
    String receiverName;
    String content;
    String roomId;
    LocalDateTime createdAt;

}
