# README.md

# 🗣️BlahBlah 🗣️

## ✅ **프로젝트 소개**

### BlahBlah는 온라인 언어 교환 플랫폼으로 다양한 국적의 사람들과 언어를 교환할 수 있는 웹사이트 입니다.



## 1-1. 주제 선정 배경 및 목표

- 주제 선정 배경

  현재 우리나라는 언어 공부를 문법과 독해 위주로 하는 전통적인 공교육 언어 학습법으로 언어를 익히고 있다. 이러한 학습법은 시험을 위한 공부는 될 수 있지만 언어로서의 학습은 어렵다. 언어를 가장 효과적으로 익힐 수 있는 방법은 원어민과의 대화인데 실생활에서 원어민을 접하기란 쉽지 않다. 따라서 제 2외국어 학습을 원하는 고객들을 대상으로 언어 교환을 활용하여 학습할 수 있는 플랫폼을 기획했다.

- 유사 서비스 사례 소개

  탄뎀이라는 서비스에서 언어 교환 학습 서비스를 운영중이며 유용한 기능으로는 채팅에서 상대방이 잘못된 부분을 첨삭해줄 수 있는 기능을 제공하고 있어 이를 벤치마킹 하였다.

- 서비스의 차별점

  언어 교환 학습에 도움을 줄 수 있는 단어장, 메모장, 타이머, 사전, 회화 학습 기능(화상통화 및 음성메시지 저장)을 제공할 뿐만 아니라, SNS에서 제공하는 팔로우 기능, 피드 기능 등 사회적 네트워크를 형성 할 수 있는 다양한 기능도 추가로 제공한다.

## 1-2. 목표

- 다양한 언어를 배우고 싶어하는 사람들에게 서로 언어를 교환 할 수 있는 서비스와 플랫폼 구축
- 언어 교환 서비스를 제공하여 제 2 외국어를 활발하게 학습할 수 있는 공간을 제공하고, 나아가 언어 교육 서비스까지로의 확대를 목표로 하고 있다.
- 다양한 언어를 익힐 수 있었을 뿐 아니라 그들의 사고방식과 문화를 이해하게 되면서 글로벌 시대에 적합한 경쟁력을 키워올 수 있다.
- COVID19 팬데믹이 종식되는 상황에서 대면, 비대면 상황을 가리지 않고 언제 어디서든 언어 교환을 할 수 있는 서비스를 만드는 것을 목표로 하고 있다.



## ✅ **주요 기능 **

1. 메인 화면
   
    ![메인화면](image/1.%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%80.png)

        
2. Blah 메이트 찾기
   
    ![블라메이트추천](image/2.%EB%B8%94%EB%9D%BC%EB%A9%94%EC%9D%B4%ED%8A%B8%EC%B6%94%EC%B2%9C.png)
    
    
3. 1:1 채팅
   
    ![채팅](image/3.%EC%B1%84%ED%8C%85.png)
    
    

    
    
4. 피드
   
    ![피드](image/4.%ED%94%BC%EB%93%9C%ED%8E%98%EC%9D%B4%EC%A7%80.png)
    
5. 학습 기능

    ![학습페이지](image/5.%ED%95%99%EC%8A%B5%ED%8E%98%EC%9D%B4%EC%A7%80.png)

6. 마이페이지

    ![마이페이지](image/6.%EB%A7%88%EC%9D%B4%ED%8E%98%EC%9D%B4%EC%A7%80.png)

    







## ✅ **서비스 아키텍쳐**

![자율 아키텍처 (1)](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/%EC%9E%90%EC%9C%A8%20%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98%20(1).png)



## ✅ **개발 환경**

| Frontend           | Backend                     |
| ------------------ | --------------------------- |
| Visual Studio Code | IntelliJ                    |
| React.js           | spring boot,Security,socket |
| Next.js            | Spring Security             |
| Material-UI        | Java 11                     |
| TypeScript         | AWS EC2,S3                  |
| React-Bootstrap    | mysql                       |
| WebRTC             | redis                       |
| WebSocket          | mongodb                     |

## ✅ **기술 특이점**

- 채팅서버 구축 및 기능 구현
    - WebSocket라이브러리와 STOMP프로토콜 기반 Publish&Subscribe 방식의 Spring WebSocket 채팅서버 구현 
    
    - NoSql인 MongoDB를 DB로 이용하여 채팅 내역을 저장하고 조회함
    
    - KISA에서 개발한 블록암호 SEED를 적용해 messege를 암호화
    
    - ssl을 적용한 wss 및 jwt 토큰을 통한 사용자 인증 처리 후 소켓 연결 과정을 거치게하게 보안적 요소를 강화
    
      
    
- 영상통화를 위한 Kurento Media 서버 및 Spring WebSocket 서버
    - 영상통화 기능 구현 및 보안을 위해 jwt를 통해 사용자를 인증하고 유효시간이 정해진 Access Token을 발급받아 상호 간 연결이 이루어짐
    
      
    
- 번역기능
    - 구글 번역 API에서 자주 변경되지 않는 데이터를 구분하여 테이블을 설계해 데이터를 삽입하는 API를 호출하여 DB에 저장하고 사용함으로써 구글 API호출을 최소화
    
      
    
      

## ✅ **협업 툴**

- Gitlab

```
<Git Convention>
FEAT:    새로운 기능을 추가할 경우
FIX:     버그를 고친 경우
DESIGN : CSS 등 사용자 UI 디자인 변경
!HOTFIX: 급하게 치명적인 버그를 고쳐야하는 경우
STYLE:   코드 포맷 변경, 간단한 수정, 코드 변경이 없는 경우
REFATOR: 프로덕션 코드 리팩토링
COMMENT: 필요한 주석 추가 및 변경
DOCS:    문서를 수정한 경우
Rename:  파일 혹은 폴더명 수정 및 이동
Remove:  파일 삭제

예시) FEAT: 로그인 기능 추가
```

- Jira
    - 협업 및 일정, 업무 관리를 위해 Jira를 이용하였습니다. 매주 월요일 오전 회의에서 한 주 동안 진행되어야 할 주 단위 계획을 짜고, 진행할 이슈들을 스프린트를 만들어 등록했습니다. 스프린트는 일주일 단위로 진행하였습니다.
        1. Epic : 큰틀로써 여러 스토리와 테스크의 집합으로 사용하였습니다. 
        2. story : 개발 일정의 경우 story로 할당하였습니다
        3. task : 관련 학습이나 문서 작업의 경우 task로 할당하였습니다.
- Mattermost
- Gather

## ✅ **포트 정리**

| 포트번호 | 설명 |
| --- | --- |
| 80 | server default(nginx, http)(redirect to 443) |
| 443 | server default(nginx, https) |
| 5443 | Front (react) |
| 8443 | REST API(spring boot) 메인서버 |
| 8080 | Chat WebSocket 서버 |
| 9443 | Call WebSokcet 서버 |
| 3478 | coturn 서버 |
| 8888  | Kurento Media 서버 |
| 3306 | mySql |
| 27017 | mongodb |
| 6380 | redis |
| 9999 | jenkins |

## ✅ **팀 소개**

| 👻 김승환 | 😺 김지원 | 🧚‍♂️ 이종준 | 🐸 김근태 | 🦖 박성건 | 🌸 고재현 |  |
| --- | --- | --- | --- | --- | --- | --- |
| https://github.com/Panseung/ | https://github.com/flykimjiwon | https://github.com/leecoder92 | https://github.com/damwon | https://github.com/rudy0103 | https://github.com/jaehyeon98 |  |
| Frontend, 팀장 | Frontend | Frontend | Backend | Backend | Backend |  |
