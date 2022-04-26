package com.ssafy.blahblahchat.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/hell")
public class HelloController {

    @GetMapping("/test")
    public String hello(){
        System.out.println("HelloController.hello");
        return "hello";
    }
}
