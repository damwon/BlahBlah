package com.ssafy.blahblahcall.api.controller;


import com.ssafy.blahblahcall.WebSocketAuthInfo;
import com.ssafy.blahblahcall.api.service.member.UserService;
import com.ssafy.blahblahcall.common.auth.SsafyUserDetails;
import com.ssafy.blahblahcall.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/authentication")
@CrossOrigin("*")
public class AuthenticationController {
    final Cache authCache;
    @Autowired
    UserService userService;

    @Autowired
    public AuthenticationController(CacheManager cacheManager) {
        this.authCache = cacheManager.getCache("AuthCache");
    }



    @GetMapping("/token")
    @ResponseStatus(HttpStatus.OK)
    public UUID getToken(Authentication authentication) {

        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String username = userDetails.getUsername();
        User user = userService.getUserByEmail(username);
        UUID websocketAuthToken = UUID.randomUUID();
        WebSocketAuthInfo webSocketAuthInfo =
                new WebSocketAuthInfo(websocketAuthToken);

        authCache.put(websocketAuthToken, webSocketAuthInfo);

        return websocketAuthToken;
    }
}