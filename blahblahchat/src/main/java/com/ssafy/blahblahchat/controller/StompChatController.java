package com.ssafy.blahblahchat.controller;


import com.ssafy.blahblahchat.Msg;
import com.ssafy.blahblahchat.dto.ChatMessageDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import java.security.Principal;


// Topic Subscribe 방식, STOMP 프로토콜
@Controller
@RequiredArgsConstructor
public class StompChatController {


    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달


    @MessageMapping(value = "/chat/enter")
    public void enter(ChatMessageDTO message){
        message.setMessage(message.getWriter()+"님이 채팅방에 참여하였습니다.");
        template.convertAndSend("/sub/chat/room"+message.getRoomId(),message);
    }

    @MessageMapping(value = "chat/message")
    public void message(ChatMessageDTO message){
        template.convertAndSend("/sub/chat/room/"+message.getRoomId(),message);
    }

    @MessageMapping("/{opponentId}")
    public void greeting(Msg message, @DestinationVariable String opponentId, Principal principal) throws Exception {
        System.out.println(opponentId);
        System.out.println(message.getContent());
        Thread.sleep(500); // simulated delay

        template.convertAndSend("/topic/"+opponentId, new Msg(message.getContent()));
//        return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
    }


}
