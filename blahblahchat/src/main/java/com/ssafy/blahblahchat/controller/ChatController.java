package com.ssafy.blahblahchat.controller;


import com.ssafy.blahblahchat.dto.ChatRoomDTO;
import com.ssafy.blahblahchat.entity.ChatList;
import com.ssafy.blahblahchat.repository.ChatRoomRepository;
import com.ssafy.blahblahchat.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Log4j2
public class ChatController {

    private final ChatRoomService chatRoomService;

    @PostMapping("/chat/create")
    public void createRoom(@RequestBody ChatRoomDTO chatRoomDTO){
        System.out.println("ChatController.createRoom");
        System.out.println("chatRoomDTO = " + chatRoomDTO.getUserId());
        chatRoomService.createChatRoom(chatRoomDTO);
        return;
    }

    @GetMapping("/chat")//유저 아이디와 상대방 아이디로 채팅방 번호를 찾는다.
    public String findRoom(@RequestBody ChatRoomDTO chatRoomDTO){
        System.out.println("ChatController.findRoom");
        String roomId=chatRoomService.findChatRoom(chatRoomDTO.getUserId(),chatRoomDTO.getOpponentId());
        if(roomId==null){
            return "No Result";
        }
        return roomId;
    }

    @GetMapping("/chatList")
    public List<ChatList> findRooms(@RequestParam String userId){
        System.out.println("ChatController.findRooms");
        return chatRoomService.findChatListByUserId(Long.parseLong(userId));
    }

}
