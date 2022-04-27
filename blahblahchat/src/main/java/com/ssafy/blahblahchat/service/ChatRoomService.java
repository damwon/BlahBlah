package com.ssafy.blahblahchat.service;


import com.ssafy.blahblahchat.dto.ChatRoomDTO;
import com.ssafy.blahblahchat.entity.ChatList;
import com.ssafy.blahblahchat.entity.TestMsg;
import com.ssafy.blahblahchat.repository.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;
@Transactional
@Service
public class ChatRoomService {

    @Autowired
    ChatRoomRepository chatRoomRepository;

    public void createChatRoom(ChatRoomDTO chatRoomDTO){

        System.out.println("ChatRoomService.createChatRoom");

        if("No Result".equals(findChatRoom(chatRoomDTO.getUserId(), chatRoomDTO.getOpponentId()))){
            final ChatList chatList = ChatList.builder()
                    .userId(chatRoomDTO.getUserId())
                    .opponentId(chatRoomDTO.getOpponentId())
                    .roomId(UUID.randomUUID().toString())
                    .roomName(chatRoomDTO.getOpponentName())
                    .build();

            chatRoomRepository.createChat(chatList);
        }else{
            System.out.println("create room fail, room already exist");
        }
    }

    public String findChatRoom(long userId, long opponentId){
        return chatRoomRepository.findChat(userId,opponentId);
    }

    public List<ChatList> findChatListByUserId(long userId){
        return chatRoomRepository.findChatListByUserId(userId);
    }

    public void updateList(long userId,long opponentId,String opponentName, TestMsg testMsg) {

        System.out.println("ChatRoomService.updateList");

        if("No Result".equals(findChatRoom(userId, opponentId))){
            final ChatList chatList = ChatList.builder()
                    .userId(userId)
                    .opponentId(opponentId)
                    .roomId(UUID.randomUUID().toString())
                    .roomName(opponentName)
                    .build();
            chatRoomRepository.createChat(chatList);
        }else{
            System.out.println("create room fail, room already exist");
        }

        chatRoomRepository.updateChatList(userId,opponentId,testMsg);

    }

    public void updateLastRead(long userId,long opponentId) {
        System.out.println("ChatRoomService.updateLastRead");
        chatRoomRepository.updateLastRead(userId,opponentId);

    }
}
