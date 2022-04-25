package com.ssafy.blahblahchat.entity;


import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity(name = "chat_list")
public class ChatList {


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
    private String lastRead;

}
