package com.ssafy.blahblah.api.response.study;

import com.ssafy.blahblah.db.entity.Word;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class WordListPageRes {
    private List<WordListRes> wordListRes;
    private int totalPages;

    public WordListPageRes(Page<Word> words){
        this.wordListRes = words.stream().map(WordListRes::fromEntity).collect(Collectors.toList());
        this.totalPages = words.getTotalPages();
    }

}
