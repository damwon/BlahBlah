package com.ssafy.blahblahchat.controller;


import com.ssafy.blahblahchat.entity.Message;
import com.ssafy.blahblahchat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class MessageController {

    @Autowired
    ChatService chatService;

    @PostMapping("/message")
    public Message sendMessage(@RequestBody Message message){
        message.setCreatedAt(LocalDateTime.now());
        return chatService.saveMessage(message);
    }

    @GetMapping("/message/{roomId}")
    public List<Message> getMessagesByRoomId(@PathVariable String roomId){
    return chatService.findAllMessagesByRoomId(roomId);
    }

    @GetMapping("/messages/{userId}")
    public List<Message> getMessagesByUserId(@PathVariable String userId){
        System.out.println(userId);
        System.out.println("MessageController.getMessagesByUserId");
        return chatService.findAllMessagesByUserId(userId);
    }

}
