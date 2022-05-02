package com.ssafy.blahblahchat.api.service.member;

public interface EmailService {
    void sendMail(String to, String sub, String text);
}
