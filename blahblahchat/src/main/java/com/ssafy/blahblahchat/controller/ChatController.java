package com.ssafy.blahblahchat.controller;


import com.ssafy.blahblahchat.dto.ChatMetaDTO;
import com.ssafy.blahblahchat.entity.ChatMeta;
import com.ssafy.blahblahchat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Log4j2
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/chat")
    public void createRoom(@RequestBody ChatMetaDTO chatMetaDTO){
        chatService.createChatRoom(chatMetaDTO);
        return;
    }

    @GetMapping("/chat")//유저 아이디와 상대방 아이디로 채팅방 번호를 찾는다.
    public String findRoom(@RequestBody ChatMetaDTO chatMetaDTO){
        log.info("ChatController.findRoom");
        System.out.println("ChatController.findRoom");
        String roomId= chatService.findChatRoom(chatMetaDTO.getUserId(),chatMetaDTO.getOpponentId());
        if(roomId==null){
            return "No Result";
        }
        return roomId;
    }

    //유저 아이디로 MySql에 저장된 채팅 리스트를 모두 찾는다.
    @GetMapping("/chatList")
    public List<ChatMeta> findRooms(@RequestParam String userId){
        log.info("ChatController.findRooms");
        return chatService.findChatListByUserId(Long.parseLong(userId));
    }

}
