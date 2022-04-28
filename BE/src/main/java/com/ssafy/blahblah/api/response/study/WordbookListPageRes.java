package com.ssafy.blahblah.api.response.study;

import com.ssafy.blahblah.db.entity.Word;
import com.ssafy.blahblah.db.entity.Wordbook;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class WordbookListPageRes {
    private List<WordbookListRes> wordbookListRes;
    private int totalPages;

    public WordbookListPageRes(Page<Wordbook> wordbooks){
        this.wordbookListRes = wordbooks.stream().map(WordbookListRes::fromEntity).collect(Collectors.toList());
        this.totalPages = wordbooks.getTotalPages();
    }
}
