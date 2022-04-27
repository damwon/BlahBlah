package com.ssafy.blahblahchat.controller;


import com.ssafy.blahblahchat.dto.MessageDTO;
import com.ssafy.blahblahchat.entity.ChatList;
import com.ssafy.blahblahchat.entity.TestMsg;
import com.ssafy.blahblahchat.service.ChatRoomService;
import com.ssafy.blahblahchat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;


// Topic Subscribe 방식, STOMP 프로토콜
@Controller
@RequiredArgsConstructor
public class StompChatController {

    private final ChatRoomService chatRoomService;
    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달

    @Autowired
    ChatService chatService;
    @MessageMapping(value = "/list/{userId}") //로그인하면 구독 상태, 자기 채팅 리스트를 받아와야함
    public void enter(@DestinationVariable String userId){
        System.out.println(userId);
        List<ChatList> chatList=chatRoomService.findChatListByUserId(Long.parseLong(userId));
        template.convertAndSend("/topic/list/"+userId,chatList);
    }


    @MessageMapping("/send/{opponentId}/to-other")
    public void sendToOther(MessageDTO message, @DestinationVariable String opponentId, Principal principal) throws Exception {
        System.out.println(opponentId);
        System.out.println(message.getContent());
        TestMsg testMsg=new TestMsg();
        testMsg.setSenderId(message.getSenderId());
        System.out.println(message.getReceiverId()+"@@@@");
        testMsg.setReceiverId(message.getReceiverId());
        testMsg.setContent(message.getContent());
        testMsg.setCreatedAt(LocalDateTime.now());
        TestMsg tm=chatService.saveMsg(testMsg);
        System.out.println("@@@@@@@@@@"+tm);
        chatRoomService.updateList(Long.parseLong(message.getSenderId()),Long.parseLong(opponentId),message.getReceiverName(),testMsg);
        chatRoomService.updateList(Long.parseLong(message.getReceiverId()),Long.parseLong(message.getSenderId()),message.getSenderName(),testMsg);
        template.convertAndSend("/topic/"+opponentId, testMsg);
    }

    @MessageMapping("/send/{opponentId}/to-me")
    public void sendToMe(MessageDTO message, @DestinationVariable String opponentId, Principal principal) throws Exception {
        System.out.println(opponentId);
        System.out.println(message.getContent());
        template.convertAndSend("/topic/"+opponentId, message);
    }
    @MessageMapping("/read/{userId}/{opponentId}")
    public void sendToMe(MessageDTO message,@DestinationVariable String userId, @DestinationVariable String opponentId, Principal principal) throws Exception {
       chatRoomService.updateLastRead(Long.parseLong(userId),Long.parseLong(opponentId));
    }


//    @MessageMapping("/history")
//    public void getHistory(RequestDTO message, @DestinationVariable String opponentId, Principal principal) throws Exception {
//        System.out.println(opponentId);
//        System.out.println(message.getContent());
//        RequestDTO msg = new RequestDTO(message.getType(),message.getSender(),message.getReceiver(), message.getContent());
//        template.convertAndSend("/topic/"+opponentId, msg);
//
//    }


}
