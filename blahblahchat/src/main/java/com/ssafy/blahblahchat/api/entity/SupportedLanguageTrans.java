package com.ssafy.blahblahchat.api.entity;


import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity(name = "trans_supportedlanguage")
public class SupportedLanguageTrans {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private String targetLanguageCode;

    @Column(nullable = false)
    private String label;

    @Column
    private String code;

}
