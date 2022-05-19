package com.ssafy.blahblahchat.api.service;


import com.ssafy.blahblahchat.api.dto.MessageDTO;
import com.ssafy.blahblahchat.api.entity.Message;
import com.ssafy.blahblahchat.common.encryption.Seed;
import lombok.RequiredArgsConstructor;
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
    private final Seed seed;


    public Message saveMessage(MessageDTO messageDTO){
        Message message = tranDTO(messageDTO);
        mongoTemplate.insert(message,"message");
        return message;
    }

    // 채팅방을 기준으로 메시지를 모두 찾음
    // 채팅방 히스토리 불러 올 때 사용
    public List<Message> findAllMessagesByRoomId(String roomId){
        Criteria criteria = new Criteria("roomId");
        criteria.is(roomId);
        Query query=new Query(criteria);
        List<Message> list = mongoTemplate.find(query,Message.class,"message");
        for(Message message:list){
            if(message.getContent()!=null)
                message.setContent(seed.decrypt(message.getContent()));
            if(message.getComment()!=null)
                message.setComment(seed.decrypt(message.getComment()));
        }
        return list;
    }

//    //유저 아이디로 보내거나 받은 메시지를 모두 찾음
//    public List<Message> findAllMessagesByUserId(String userId){
//        Criteria criteria = new Criteria();
//        criteria.orOperator(Criteria.where("senderId").is(userId),Criteria.where("receiverId").is(userId));
//        Query query=new Query(criteria);
//        System.out.println(query.toString());
//        return mongoTemplate.find(query,Message.class,"message");
//    }

    public Message tranDTO(MessageDTO messageDTO){
        Message message = new Message();
        message.setType(messageDTO.getType());
        message.setSenderId(messageDTO.getSenderId());
        message.setSenderName(messageDTO.getSenderName());
        message.setReceiverId(messageDTO.getReceiverId());
        message.setReceiverName(messageDTO.getReceiverName());
        if(messageDTO.getContent()!=null) {
            message.setContent(seed.encrypt(messageDTO.getContent()));//암호화

        }
        if(messageDTO.getComment()!=null) {
            message.setComment(seed.encrypt(messageDTO.getComment())); //암호화
        }
        message.setRoomId(messageDTO.getRoomId());
        message.setCreatedAt(LocalDateTime.now());
        return message;
    }

}
