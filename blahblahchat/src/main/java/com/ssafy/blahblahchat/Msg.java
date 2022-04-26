package com.ssafy.blahblahchat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor

public class Msg {

    private String sender;
    private String receiver;
    private String content;

}