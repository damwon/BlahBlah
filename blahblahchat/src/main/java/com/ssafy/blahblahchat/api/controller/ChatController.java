package com.ssafy.blahblahchat.api.controller;


import com.ssafy.blahblahchat.api.dto.ChatMetaDTO;
import com.ssafy.blahblahchat.api.entity.ChatMeta;
import com.ssafy.blahblahchat.api.service.ChatService;
import com.ssafy.blahblahchat.common.auth.SsafyUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Log4j2
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/api/chat")
    public void createRoom(@RequestBody ChatMetaDTO chatMetaDTO){
        chatService.createChatRoom(chatMetaDTO);
        return;
    }

    @GetMapping("/api/chat/{opponentId}")//유저 아이디와 상대방 아이디로 채팅방 번호를 찾는다.
    public String findRoom(Authentication authentication, @PathVariable Long opponentId){
        System.out.println(authentication);
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        Long userId = userDetails.getUserId();
        log.info("ChatController.findRoom");
        System.out.println("ChatController.findRoom");
        String roomId= chatService.findChatRoom(userId,opponentId);
        if(roomId==null){
            return "No Result";
        }
        return roomId;
    }

    //유저 아이디로 MySql에 저장된 채팅 리스트를 모두 찾는다.
    @GetMapping("/api/chat-list/{userId}")
    public List<ChatMeta> findRooms(@PathVariable String userId){
        log.info("ChatController.findRooms");
        return chatService.findChatListByUserId(Long.parseLong(userId));
    }



}
