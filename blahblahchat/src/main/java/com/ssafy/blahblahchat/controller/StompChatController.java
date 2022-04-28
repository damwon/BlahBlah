package com.ssafy.blahblahchat.controller;


import com.ssafy.blahblahchat.dto.MessageDTO;
import com.ssafy.blahblahchat.entity.ChatMeta;
import com.ssafy.blahblahchat.entity.Message;
import com.ssafy.blahblahchat.service.ChatService;
import com.ssafy.blahblahchat.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
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
@Log4j2
public class StompChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달

    @Autowired
    MessageService messageService;
    @MessageMapping(value = "/list/{userId}") //로그인하면 구독 상태, 자기 채팅 리스트를 받아와야함
    public void enter(@DestinationVariable String userId){

        List<ChatMeta> chatList= chatService.findChatListByUserId(Long.parseLong(userId));
        log.debug("userId:{} listCnt:{}",userId,chatList.size());
        template.convertAndSend("/topic/list/"+userId,chatList);
    }


    @MessageMapping("/send/{opponentId}/to-other")
    public void sendToOther(MessageDTO messageDTO, @DestinationVariable String opponentId, Principal principal) throws Exception {
        log.debug("StompChatController.sendToOther");
        log.debug("senderId: {} receiverId:{}",messageDTO.getSenderId(),messageDTO.getReceiverId());

        Message saveMessage=messageService.saveMessage(messageDTO);

        //채팅이 오가면 MySql에 저장된 채팅 리스트 메타 정보를 바꿔줘야함
        chatService.updateList(Long.parseLong(messageDTO.getSenderId()),Long.parseLong(opponentId),messageDTO.getReceiverName(),saveMessage);
        chatService.updateList(Long.parseLong(messageDTO.getReceiverId()),Long.parseLong(messageDTO.getSenderId()),messageDTO.getSenderName(),saveMessage);
        template.convertAndSend("/topic/"+opponentId, messageDTO);
    }

    @MessageMapping("/send/{opponentId}/to-me")
    public void sendToMe(MessageDTO messageDTO, @DestinationVariable String opponentId, Principal principal) throws Exception {
        template.convertAndSend("/topic/"+opponentId, messageDTO);
    }
    @MessageMapping("/read/{userId}/{opponentId}")
    public void sendToMe(MessageDTO message,@DestinationVariable String userId, @DestinationVariable String opponentId, Principal principal) throws Exception {
       chatService.updateLastRead(Long.parseLong(userId),Long.parseLong(opponentId));
    }


    @MessageMapping("/history/{userId}/{roomId}")
    public void getHistory(@DestinationVariable String userId,@DestinationVariable String roomId) throws Exception {
       List<Message> messages=messageService.findAllMessagesByRoomId(roomId);
        template.convertAndSend("/topic/"+userId, messages);
    }


}
