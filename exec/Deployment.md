# Deployment

## 0. Letsencrypt

아래 명령어를 통해 letsencrypt를 설치

```bash
sudo apt-get update
sudo apt-get install letsencrypt
```



아래 명령어를 통해 도메인의 인증서를 발급 받음

```bash
sudo letsencrypt certonly --standalone -d 도메인 
```

"Congratulation"으로 시작하는 문구가 보여야 발급 완료



발급된 인증서는 아래 처럼 저장됨(나중에 nginx 설정에서 사용되기 때문에 다른 곳으로 임의로 이동 X)

```
/etc/letsencrypt/live/도메인/fullchain.pem
/etc/letsencrypt/live/도메인/privkey.pem
```

![image-20220214174333286](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220214174333286.png)



---------------------------------

## 1. 프론트엔드 배포

깃을 클론한 후 FE디렉터리로 이동



```bash
cd FE
```







## 3. 백엔트 배포



### 백엔드를 배포하기 전에 mySql 설정을 해야한다.

application.properties에 맞는 계정,비밀번호,database가 있어야한다.

```
계정 blah
비밀번호 ssafy
db명 blah_db	
```



```
create user 'blah'@'%' identified by 'ssafy';
grant all privileges on *.* to 'blah'@'%';
```

-----------------------------------------------

### 백엔드 배포 전에 예전에 만들어 놓은 letsencrypt 인증서를 p12로 바꿔야한다.



```bash
sudo su
cd cd /etc/letsencrypt/live/도메인/
```



```bash
openssl pkcs12 -export -in fullchain.pem -inkey privkey.pem -out keystore.p12 -CAfile chain.pem -caname root
```

변환한 key를 resources/keystore에 복사

```
cp keystore.p12 /home/ubuntu/백엔드경로/src/main/resources/keystore/keystore.p12
```

인증서 관련 정보 application.properties 설정에서도 변경



![image-20220519110618314](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220519110618314.png)



# Kurento Media 서버, Turn 서버 배포



### 1 Docker 설치

- 참고 - https://docs.docker.com/engine/install/ubuntu/

#### Set up the repository

1. Update the `apt` package index and install packages to allow `apt` to use a repository over HTTPS

   ```bash
    sudo apt-get update
    
    sudo apt-get install \
       ca-certificates \
       curl \
       gnupg \
       lsb-release
   ```

   

2. Add Docker’s official GPG key:

   ```bash
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
   ```

   

3. Use the following command to set up the **stable** repository. To add the **nightly** or **test** repository, add the word `nightly` or `test` (or both) after the word `stable` in the commands below. [Learn about **nightly** and **test** channels](https://docs.docker.com/engine/install/).

   ```
   echo \
     "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
     $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```

   -------------------------------------

#### Install Docker Engine

 1. Update the `apt` package index, and install the *latest version* of Docker Engine and containerd, or go to the next step to install a specific version:

    ```bash
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io
    ```



+ 특정 버전의 docker-compose 설치

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

![image-20220112162512840](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220112162512840.png)



+ 권한설정

  ```bash
  sudo chmod +x /usr/local/bin/docker-compose
  ```

  

## 2 도커 이미지 설치 및 실행

```
sudo docker pull kurento/kurento-media-server:latest

sudo docker run -d --network host kurento/kurento-media-server:latest
```

![image-20220112164046907](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220112164046907.png)

여기까지 완료후 STUN/TURN 서버를 설치 및 설정 후 다시

kurento를 설정하면 된다.



## STUN/TURN 서버 설치 및 설정



## 1. Coturn 설치

```bash
sudo apt-get install --no-install-recommends --yes coturn
```



## 2. Coturn 설정

### /etc/default/coturn 파일을 아래와 같이 수정



![image-20220112164937057](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220112164937057.png)

+ 권한이 없기 때문에 sudo로 수정해야함

```
sudo vi /etc/default/coturn
```

### /etc/turnserver.conf 도 아래와 같이 수정

<>에는 알맞은 주소 기입

```
listening-port=3478
tls-listening-port=5349
listening-ip=<EC2의 private ipv4 주소>
relay-ip=<EC2의 프라이빗 ip 주소>
external-ip=<EC2 의 퍼블릭 ipv4 주소>/<EC2의 프라이빗 IPv4 주소>
fingerprint
lt-cred-mech
user=myuser:mypassword   --> 이따 kurento서버 설정에서 사용함 (바꿔도 됨)
realm=myrealm 
log-file=/var/log/turn.log
simple.log
```



### Coturn 재시작

-------------------------------------------------------------

# Kurento 설정

Kurento 미디어 서버가 STUN/TURN 서버와 함께 동작하기 위해 위치를 지정해야함



### Kurento Docker 컨테이너 접속



![image-20220112172753079](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220112172753079.png)



### Kurento WebRtcEndpoint.ini 수정

```bash
vi /etc/kurento/modules/kurento/WebRtcEndpoint.conf.ini
```

명령어로 아래와 같이 수정 <>에는 알맞은 주소 기입 

myuser와 mypassword는 이전에 STUN서버에서 설정한 내용과 같아야한다.

```text
stunServerAddress=<퍼블릭 주소>
stunServerPort=3478
turnURL=myuser:mypassword@<퍼블릭주소>:3478?transport=udp
```

exit로 빠져나와서 KMS컨테이너 재실행

```bash
exit
sudo docker restart 컨테이너ID
```



여기 까지 완료했으면

```bash
sudo netstat -antp
```

명령어로



![image-20220112173708183](https://raw.githubusercontent.com/rudy0103/save-image-repo/master/img/image-20220112173708183.png)



8888(KMS) 포트와 3478(STUN) 포트가 열린것을 볼 수 있다.



## 서버 실행

BE, blahblahchat, blahblahcall 을 빌드하고 Run 시킴







