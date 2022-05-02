package com.ssafy.blahblahchat.service;


import com.ssafy.blahblahchat.dto.MessageDTO;
import com.ssafy.blahblahchat.entity.Message;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MongoTemplate mongoTemplate;


    public Message saveMessage(MessageDTO messageDTO){
        System.out.println("MessageService.saveMessage");
        Message message = tranDTO(messageDTO);
        mongoTemplate.insert(message,"message");
        return message;
    }

    // 채팅방을 기준으로 메시지를 모두 찾음
    // 채팅방 히스토리 불러 올 때 사용
    public List<Message> findAllMessagesByRoomId(String roomId){
        System.out.println("MessageService.findAllMessagesByRoomId");
        Criteria criteria = new Criteria("roomId");
        criteria.is(roomId);
        Query query=new Query(criteria);
        return mongoTemplate.find(query,Message.class,"message");
    }

    //유저 아이디로 보내거나 받은 메시지를 모두 찾음
    public List<Message> findAllMessagesByUserId(String userId){
        System.out.println("MessageService.findAllMessagesByUserId");
        Criteria criteria = new Criteria();
        criteria.orOperator(Criteria.where("senderId").is(userId),Criteria.where("receiverId").is(userId));
        Query query=new Query(criteria);
        System.out.println(query.toString());
        return mongoTemplate.find(query,Message.class,"message");
    }

    public Message tranDTO(MessageDTO messageDTO){
        System.out.println("MessageService.tranDTO");
        Message message = new Message();
        message.setType(messageDTO.getType());
        message.setSenderId(messageDTO.getSenderId());
        message.setSenderName(messageDTO.getSenderName());
        message.setReceiverId(messageDTO.getReceiverId());
        message.setReceiverName(messageDTO.getReceiverName());
        message.setContent(messageDTO.getContent());
        message.setRoomId(messageDTO.getRoomId());
        message.setCreatedAt(LocalDateTime.now());
        return message;
    }

}
