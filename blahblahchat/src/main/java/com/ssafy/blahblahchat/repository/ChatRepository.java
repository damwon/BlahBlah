package com.ssafy.blahblahchat.repository;


import com.ssafy.blahblahchat.entity.ChatMeta;
import com.ssafy.blahblahchat.entity.Message;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import java.time.LocalDateTime;
import java.util.*;

@Repository
@Log4j2
public class ChatRepository {

    @PersistenceContext
    EntityManager em;

    public long createChat(ChatMeta chatList){
        log.info("ChatRoomRepository.createChat");
        em.persist(chatList);
        return chatList.getId();
    }

    public String findChat(long userId, long opponentId){
        log.info("ChatRepository.findChat");
        try {
            ChatMeta chat = em.createQuery("select c from chat_list c where c.userId=:userId and c.opponentId=:opponentId", ChatMeta.class)
                    .setParameter("userId", userId)
                    .setParameter("opponentId", opponentId)
                    .getSingleResult();
            return chat.getRoomId();
        } catch (NoResultException e){
                return "No Result";
        }
    }

    public String updateChatList(long userId, long opponentId, Message message){
        System.out.println("ChatRepository.updateChatList");
        try {
            ChatMeta target = em.createQuery("select c from chat_list c where c.userId=:userId and c.opponentId=:opponentId", ChatMeta.class)
                    .setParameter("userId", userId)
                    .setParameter("opponentId", opponentId)
                    .getSingleResult();
            target.setLast_msg_date(message.getCreatedAt());
            int lastMagLength=message.getContent().length();
            if(lastMagLength>20)
                target.setLastMsg(message.getContent().substring(0,18));
            else
                target.setLastMsg(message.getContent());
            if(userId!=Long.parseLong(message.getSenderId()))
                target.setUnread(target.getUnread()+1);
            else
                target.setUnread(0);
            return "Success";
        } catch (NoResultException e){
            return "No Result";
        }
    }

    public String updateLastRead(long userId, long opponentId){
        System.out.println("ChatRepository.updateLastRead");
        try {
            ChatMeta target = em.createQuery("select c from chat_list c where c.userId=:userId and c.opponentId=:opponentId", ChatMeta.class)
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


    public List<ChatMeta> findChatListByUserId(long userId){
        System.out.println("ChatRepository.findChatListByUserId");
        try {
            List<ChatMeta> chatList = em.createQuery("select c from chat_list c where c.userId=:userId ", ChatMeta.class)
                    .setParameter("userId", userId)
                    .getResultList();
            return chatList;
        } catch (NoResultException e){
            return null;
        }
    }
}
