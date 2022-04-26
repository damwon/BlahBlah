package com.ssafy.blahblahchat.service;


import com.ssafy.blahblahchat.Msg;
import com.ssafy.blahblahchat.entity.Message;
import com.ssafy.blahblahchat.entity.TestMsg;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class ChatService {


    @Autowired
    MongoTemplate mongoTemplate;


    public Message saveMessage(Message message){
        String senderId=message.getSenderId();
        String receiverId=message.getSenderId();
        String roomId=message.getRoomId();

        mongoTemplate.insert(message,"chat");

        return message;
    }
    //Test
    public TestMsg saveMsg(TestMsg message){
        String senderId=message.getSenderId();
        String receiverId=message.getReceiverId();
        String content=message.getContent();
        System.out.println("ChatService.saveMsg");
        mongoTemplate.insert(message,"msg");

        return message;
    }

    public List<Message> findAllMessagesByRoomId(String roomId){
        Criteria criteria = new Criteria("roomId");
        criteria.is(roomId);

        Query query=new Query(criteria);
        return mongoTemplate.find(query,Message.class,"chat");
    }

    public List<Message> findAllMessagesByUserId(String userId){
        System.out.println("ChatService.findAllMessagesByUserId");
        Criteria criteria = new Criteria();
        criteria.orOperator(Criteria.where("senderId").is(userId),Criteria.where("receiverId").is(userId));
        Query query=new Query(criteria);
        System.out.println(query.toString());
        return mongoTemplate.find(query,Message.class,"chat");
    }


}
