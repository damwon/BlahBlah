package com.ssafy.blahblahchat.repository;


import com.ssafy.blahblahchat.dto.ChatRoomDTO;
import com.ssafy.blahblahchat.entity.ChatList;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
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
