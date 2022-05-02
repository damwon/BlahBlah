package com.ssafy.blahblahchat.controller;


import com.ssafy.blahblahchat.dto.MessageDTO;
import com.ssafy.blahblahchat.entity.Message;
import com.ssafy.blahblahchat.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Log4j2
@CrossOrigin("*")
public class MessageController {


    private final MessageService messageService;

    @PostMapping("/message")
    public Message sendMessage(@RequestBody MessageDTO messageDTO){

        Message message=messageService.tranDTO(messageDTO);
        return message;
    }

    @GetMapping("/message/{roomId}")
    public List<Message> getMessagesByRoomId(@PathVariable String roomId){
    return messageService.findAllMessagesByRoomId(roomId);
    }

    @GetMapping("/messages/{userId}")
    public List<Message> getMessagesByUserId(@PathVariable String userId){
        log.debug("MessageController.getMessagesByUserId");
        return messageService.findAllMessagesByUserId(userId);
    }

}
