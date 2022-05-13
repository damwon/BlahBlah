package com.ssafy.blahblahchat.api.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
@ApiModel("MessageDTO")
public class MessageDTO {
    @ApiModelProperty(name="메시지 타입", example="text, image, audio,comment")
    private String type;
    @ApiModelProperty(name="보내는 사람 아이디", example="12")
    private String senderId;
    @ApiModelProperty(name="보내는 사람 이름", example="박성건")
    private String senderName;
    @ApiModelProperty(name="받는 사람 아이디", example="13")
    private String receiverId;
    @ApiModelProperty(name="받는 사람 이름", example="이종준")
    private String receiverName;
    @ApiModelProperty(name="채팅방 UUID", example="990668a1-1c96-4ab9-96de-5373e7f5d115")
    private String roomId;
    @ApiModelProperty(name="채팅메시지 내용", example="Hi!!")
    private String content;
    @ApiModelProperty(name="채팅메시지 코멘트 내용", example="Hello!!")
    private String comment;


}