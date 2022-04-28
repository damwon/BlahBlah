package com.ssafy.blahblahchat.dto;


import lombok.Data;

@Data
public class ChatMetaDTO {
    private long userId;
    private long opponentId;
    private String roomId;
    private String opponentName;
}
