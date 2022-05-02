package com.ssafy.blahblahchat.api.response.study;

import com.ssafy.blahblah.db.entity.Word;
import com.ssafy.blahblah.db.entity.Wordbook;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class WordListRes {

    private List<WordRes> words;

    public WordListRes(Wordbook entity){
        List<Word> words = entity.getWords();
//        this.words = words;
        List<WordRes> myWords = new ArrayList<>();
        words.forEach(word -> {
            myWords.add(new WordRes(word));
        });
        this.words = myWords;
    }


}
