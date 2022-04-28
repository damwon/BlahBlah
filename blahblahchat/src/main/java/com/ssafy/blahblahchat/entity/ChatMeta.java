package com.ssafy.blahblahchat.entity;


import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity(name = "chat_list")
public class ChatMeta {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private long userId;

    @Column(nullable = false)
    private long opponentId;

    @Column(nullable = false)
    private String roomId;

    @Column(nullable = false)
    private String roomName;

    @Column
    private String lastMsg;

    @Column
    private LocalDateTime last_msg_date;

    @Column
    private LocalDateTime last_read_date;

    @Column
    private int unread;



}
