package com.ssafy.blahblahchat.api.dto;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("채팅방 만들 때 필요한 정보")
public class ChatMetaDTO {
    @ApiModelProperty(name="상대방 아이디", example="12")
    private long opponentId;
    @ApiModelProperty(name="상대방 이름", example="박성건")
    private String opponentName;
}
