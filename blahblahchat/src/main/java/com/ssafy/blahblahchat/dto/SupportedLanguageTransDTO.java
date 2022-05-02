package com.ssafy.blahblahchat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class SupportedLanguageTransDTO {
    private String targetLanguageCode;

    private String name;

    private String code;
}
