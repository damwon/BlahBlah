package com.ssafy.blahblahchat.api.dto;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel("ChatMetaDTO")
public class TransDTO {

    @ApiModelProperty(name="번역하고자 하는 채팅 text", example="How are you?")
    String text;
    @ApiModelProperty(name="어떤 언어로 번역할 것 인지", example="ko")
    String targetLanguage;
}
