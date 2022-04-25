package com.ssafy.blahblahchat.dto;


import lombok.Data;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Data
public class ChatRoomDTO {
    private long userId;
    private long opponentId;
}
