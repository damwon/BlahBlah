package com.ssafy.blahblahchat.api.dto;


import lombok.Data;

@Data
public class ChatMetaDTO {
    private long userId;
    private long opponentId;
    private String roomId;
    private String opponentName;
}
