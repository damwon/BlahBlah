package com.ssafy.blahblahchat.api.controller;


import com.ssafy.blahblahchat.api.dto.ChatMetaDTO;
import com.ssafy.blahblahchat.api.entity.ChatMeta;
import com.ssafy.blahblahchat.api.service.ChatService;
import com.ssafy.blahblahchat.common.auth.JwtAuthentication;
import com.ssafy.blahblahchat.common.auth.SsafyUserDetails;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@Api(value = "채팅 방 관련 API",tags = {"Chat."})
@RestController
@RequiredArgsConstructor
@Log4j2
@CrossOrigin("*")
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;
    private final JwtAuthentication jwtAuthentication;

    @PostMapping()
    @ApiOperation(value = "채팅방 생성",notes = "<strong>상대방과의 채팅방</strong>을 만든다.")
    @ApiResponses(
            value = {
                    @ApiResponse(code=200, message = "성공")
            }

    )
    public ResponseEntity createRoom(Authentication authentication,@RequestBody ChatMetaDTO chatMetaDTO){
        Long userId=getUserId(authentication);
        String roomId=chatService.createChatRoom(userId,chatMetaDTO.getOpponentId(),chatMetaDTO.getOpponentName());
        return new ResponseEntity(roomId,HttpStatus.OK);
    }

    @GetMapping("/{opponentId}")//유저 아이디와 상대방 아이디로 채팅방 번호를 찾는다.
    @ApiOperation(value = "채팅방 찾기",notes = "유저 아이디와 상대방 아이디로 채팅방 번호를 찾는다.")
    @ApiResponses(
            value = {
                    @ApiResponse(code=200, message = "성공"),
                    @ApiResponse(code = 404, message = "방을 찾을 수 없음")
            }
    )
    public ResponseEntity findRoom(Authentication authentication, @PathVariable Long opponentId){
        Long userId=getUserId(authentication);
        String roomId= chatService.findChatRoom(userId,opponentId);
        if("No Result".equals(roomId)){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(roomId,HttpStatus.OK);
    }

    //유저 아이디로 MySql에 저장된 채팅 리스트를 모두 찾는다.
    @GetMapping("/api/chat/list")
    @ApiOperation(value = "채팅리스트 찾기",notes = "로그인 한 유저의 모든 ChatMeta 리스트 반환")
    @ApiResponses(
            value = {
                    @ApiResponse(code=200, message = "성공"),
            }
    )
    public List<ChatMeta> findRooms(Authentication authentication){
        Long userId=getUserId(authentication);
        log.info("ChatController.findRooms");
        return chatService.findChatListByUserId(userId);
    }



    @GetMapping("/online/{opponentId}")//유저가 소켓 연결이 되어 있는가?
    @ApiOperation(value = "온라인 여부",notes = "유저의 온라인 여부(소켓 연결 여부)")
    @ApiResponses(
            value = {
                    @ApiResponse(code=200, message = "연결"),
                    @ApiResponse(code = 404, message = "연결 X")
            }
    )
    public ResponseEntity isLogin(Authentication authentication, @PathVariable Long opponentId){
        Long userId=getUserId(authentication);
        if(chatService.isConnected(opponentId)==false){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/online")//현재 연결된 모든 유저 리스트, 테스트 용
    @ApiOperation(value = "온라인 된 유저 리스트",notes = "유저의 온라인 여부(소켓 연결 여부)")
    @ApiResponses(
            value = {
                    @ApiResponse(code=200, message = "연결")
            }
    )
    public ResponseEntity loginUsers(){
        List<Long> list =chatService.allConnectedUser();
        return new ResponseEntity(list,HttpStatus.OK);
    }



    private Long getUserId(Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        return userDetails.getUserId();
    }



}
