package com.ssafy.blahblahchat.api.service;


import com.ssafy.blahblahchat.api.dto.ChatMetaDTO;
import com.ssafy.blahblahchat.api.entity.ChatMeta;
import com.ssafy.blahblahchat.api.entity.Message;
import com.ssafy.blahblahchat.api.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;
@Transactional
@Service
@Log4j2
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;

    public void createChatRoom(ChatMetaDTO chatMetaDTO){

        log.info("ChatService.createChatRoom");


        if("No Result".equals(findChatRoom(chatMetaDTO.getUserId(), chatMetaDTO.getOpponentId()))){
            final ChatMeta chatMeta = ChatMeta.builder()
                    .userId(chatMetaDTO.getUserId())
                    .opponentId(chatMetaDTO.getOpponentId())
                    .roomId(UUID.randomUUID().toString())
                    .roomName(chatMetaDTO.getOpponentName())
                    .build();

            chatRepository.createChat(chatMeta);
        }
    }

    public String findChatRoom(long userId, long opponentId){
        return chatRepository.findChat(userId,opponentId);
    }

    public List<ChatMeta> findChatListByUserId(long userId){
        return chatRepository.findChatListByUserId(userId);
    }

    public void updateList(long userId,long opponentId,String opponentName, Message message) {

        log.info("ChatService.updateList");

        if("No Result".equals(findChatRoom(userId, opponentId))){

            String roomId=findChatRoom(opponentId,userId);
            if("No Result".equals(roomId)){
                roomId=UUID.randomUUID().toString();
            }
            final ChatMeta chatMeta = ChatMeta.builder()
                    .userId(userId)
                    .opponentId(opponentId)
                    .roomId(roomId)
                    .roomName(opponentName)
                    .build();
            chatRepository.createChat(chatMeta);
        }

        chatRepository.updateChatList(userId,opponentId,message);

    }

    public void updateLastRead(long userId,long opponentId) {
        log.info("ChatService.updateLastRead");
        chatRepository.updateLastRead(userId,opponentId);

    }
}
