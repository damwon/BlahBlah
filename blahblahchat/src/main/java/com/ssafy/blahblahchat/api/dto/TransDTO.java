package com.ssafy.blahblahchat.api.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransDTO {

    String text;
    String targetLanguage;
}
