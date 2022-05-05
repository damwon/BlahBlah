package com.ssafy.blahblah.api.response.language;

import com.ssafy.blahblah.db.entity.LangInfo;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class LangListRes {
    private Long user_id;
    private Long lang_id;
    private Integer level;

    public static LangListRes fromEntity(LangInfo langInfo) {
        return LangListRes.builder()
                .user_id(langInfo.getUser().getId())
                .lang_id(langInfo.getLanguage().getId())
                .level(langInfo.getLevel())
                .build();
    }
}
