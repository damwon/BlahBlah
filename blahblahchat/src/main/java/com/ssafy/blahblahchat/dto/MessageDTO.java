package com.ssafy.blahblahchat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor

public class MessageDTO {

    private String type;
    private String senderId;
    private String senderName;
    private String receiverId;
    private String receiverName;
    private String roomId;
    private String content;


}