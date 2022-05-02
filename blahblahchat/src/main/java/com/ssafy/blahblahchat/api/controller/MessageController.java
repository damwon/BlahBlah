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

//    @PostMapping("/api/message")
//    public Message sendMessage(@RequestBody MessageDTO messageDTO){
//        Message message=messageService.tranDTO(messageDTO);
//        return message;
//    }

    //채팅방 히스토리 가져오기
    @GetMapping("/api/message/{roomId}")
    public List<Message> getMessagesByRoomId(@PathVariable String roomId){
    return messageService.findAllMessagesByRoomId(roomId);
    }

//    //유저의 채팅 히스토리 다 가져오기 (안쓰고있음)
//    @GetMapping("/api/messages/{userId}")
//    public List<Message> getMessagesByUserId(@PathVariable String userId){
//        log.debug("MessageController.getMessagesByUserId");
//        return messageService.findAllMessagesByUserId(userId);
//    }

}
