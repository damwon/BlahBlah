package com.ssafy.blahblah.api.response.study;

import com.ssafy.blahblah.db.entity.Word;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class WordRes {

    private String word;
    private String meaning;
    private LocalDateTime createdAt;

    public WordRes(Word entity){
        this.word = entity.getWord();
        this.meaning = entity.getMeaning();
        this.createdAt = entity.getCreatedAt();
    }

}
