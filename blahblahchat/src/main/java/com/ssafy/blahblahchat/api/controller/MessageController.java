package com.ssafy.blahblahchat.api.controller;


import com.ssafy.blahblahchat.api.entity.Message;
import com.ssafy.blahblahchat.api.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Log4j2
@CrossOrigin("*")
public class MessageController {


    private final MessageService messageService;

    //채팅방 히스토리 가져오기
    @GetMapping("/api/message/{roomId}")
    public List<Message> getMessagesByRoomId(@PathVariable String roomId){
    return messageService.findAllMessagesByRoomId(roomId);
    }


}
