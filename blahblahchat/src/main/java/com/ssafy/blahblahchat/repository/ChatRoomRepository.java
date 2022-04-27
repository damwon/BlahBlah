package com.ssafy.blahblahchat.repository;


import com.ssafy.blahblahchat.dto.ChatRoomDTO;
import com.ssafy.blahblahchat.entity.ChatList;
import com.ssafy.blahblahchat.entity.TestMsg;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import java.time.LocalDateTime;
import java.util.*;

@Repository
public class ChatRoomRepository {

    @PersistenceContext
    EntityManager em;

    public long createChat(ChatList chatList){
        System.out.println("ChatRoomRepository.createChat");
        em.persist(chatList);
        return chatList.getId();
    }

    public String findChat(long userId, long opponentId){

        try {
            ChatList chat = em.createQuery("select c from chat_list c where c.userId=:userId and c.opponentId=:opponentId", ChatList.class)
                    .setParameter("userId", userId)
                    .setParameter("opponentId", opponentId)
                    .getSingleResult();
            System.out.println(chat.getRoomId()+" room userId: "+userId+"opponentId: "+opponentId);
            return chat.getRoomId();
        } catch (NoResultException e){
                return "No Result";
        }
    }

    public String updateChatList(long userId, long opponentId, TestMsg testMsg){
        try {
            ChatList target = em.createQuery("select c from chat_list c where c.userId=:userId and c.opponentId=:opponentId", ChatList.class)
                    .setParameter("userId", userId)
                    .setParameter("opponentId", opponentId)
                    .getSingleResult();
            target.setLast_msg_date(testMsg.getCreatedAt());
            int lastMagLength=testMsg.getContent().length();
            if(lastMagLength>20)
                target.setLastMsg(testMsg.getContent().substring(0,18));
            else
                target.setLastMsg(testMsg.getContent());
            if(userId!=Long.parseLong(testMsg.getSenderId()))
                target.setUnread(target.getUnread()+1);
            else
                target.setUnread(0);
            return "Success";
        } catch (NoResultException e){
            return "No Result";
        }
    }

    public String updateLastRead(long userId, long opponentId){
        try {
            ChatList target = em.createQuery("select c from chat_list c where c.userId=:userId and c.opponentId=:opponentId", ChatList.class)
                    .setParameter("userId", userId)
                    .setParameter("opponentId", opponentId)
                    .getSingleResult();
           target.setLast_read_date(LocalDateTime.now());
           target.setUnread(0);
            return "Success";
        } catch (NoResultException e){
            return "No Result";
        }
    }


    public List<ChatList> findChatListByUserId(long userId){
        try {
            List<ChatList> chatList = em.createQuery("select c from chat_list c where c.userId=:userId ", ChatList.class)
                    .setParameter("userId", userId)
                    .getResultList();
            return chatList;
        } catch (NoResultException e){
            return null;
        }
    }
}
