package com.ssafy.blahblahchat.controller;

import com.ssafy.blahblahchat.Greeting;
//import com.ssafy.blahblahchat.HelloMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.util.HtmlUtils;

import java.security.Principal;
import java.util.HashMap;

@Controller
@RequiredArgsConstructor
public class GreetingController {

//    private final HashMap<String,String> sessions

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달

//    @MessageMapping("/hello")
//    @SendTo("/topic/greetings")
//    public Greeting greeting(HelloMessage message) throws Exception {
//        Thread.sleep(1000); // simulated delay
//        return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
//    }


//    @MessageMapping("/hello/{roomId}")
//    public void greeting(HelloMessage message, @DestinationVariable String roomId, Principal principal) throws Exception {
//        System.out.println(roomId);
//        System.out.println(principal);
//        Thread.sleep(500); // simulated delay
//
//        template.convertAndSend("/topic/"+roomId,new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!"));
////        return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
//    }


}