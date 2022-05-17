package com.ssafy.blahblahchat.api.service;


import com.ssafy.blahblahchat.api.entity.ChatMeta;
import com.ssafy.blahblahchat.api.entity.Message;
import com.ssafy.blahblahchat.api.repository.ChatRepository;
import com.ssafy.blahblahchat.api.service.member.UserService;
import com.ssafy.blahblahchat.db.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Transactional
@Service
@Log4j2
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final ConcurrentHashMap<Long,String> connectedUserByUserId=new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String,Long> connectedUserBySessionId=new ConcurrentHashMap<>();
    private final UserService userService;
    public String createChatRoom(Long userId,Long opponentId, String opponentName){
        String roomId=findChatRoom(userId, opponentId);
        if("No Result".equals(roomId)){
            final ChatMeta chatMeta = ChatMeta.builder()
                    .userId(userId)
                    .opponentId(opponentId)
                    .roomId(UUID.randomUUID().toString())
                    .roomName(opponentName)
                    .build();
            return chatRepository.createChat(chatMeta);
        }else{
            return roomId;
        }
    }

    public String findChatRoom(long userId, long opponentId){
        return chatRepository.findChat(userId,opponentId);
    }

    public List<ChatMeta> findChatListByUserId(long userId){

        List<ChatMeta> list =chatRepository.findChatListByUserId(userId);
        for(ChatMeta chatMeta:list){
            Optional<User> user = userService.getUserById(chatMeta.getOpponentId());
            String profileImg = user.get().getProfileImg();
            chatMeta.setProfile(profileImg);
            chatMeta.setOnline(isConnected(chatMeta.getOpponentId()));
        }
        return list;

    }

    public void updateList(long userId,long opponentId,String opponentName, Message message) {

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
        chatRepository.updateLastRead(userId,opponentId);
    }

    public void addUser(Long userId, String sessionId){
        connectedUserByUserId.put(userId,sessionId);
        connectedUserBySessionId.put(sessionId,userId);
    }

    public void removeUser(String sessionId){
        Long userId=connectedUserBySessionId.get(sessionId);
        connectedUserByUserId.remove(userId);
        connectedUserBySessionId.remove(sessionId);
    }

    public boolean isConnected(Long userId) {
        if (connectedUserByUserId.get(userId)!=null) {
            return true;
        } else {
            return false;
        }
    }

    public List<Long> allConnectedUser(){
        List<Long> list = new ArrayList<>();
        for(Map.Entry entry:connectedUserByUserId.entrySet()){
            list.add((Long)entry.getKey());
        }
        return list;
    }
}
