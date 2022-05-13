/* eslint-disable */
import { Container, Row, Col, ListGroup, Figure, Card, Button } from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Token } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import langarr from '../../component/user/Langarr'
import langkey from '../../component/user/Lang'
import langIMG from '../../component/user/LangImg'


export default function Mypage() {
  const [lang,setLang] = useState<any>([])

  const larr:any = langarr
  const lkey:any = langkey
  const lImg:any = langIMG
  // 학습언어
  const [langa,setLangA] = useState([])
  // 구사언어
  const [langb,setLangB] = useState([])
  // 모국어
  const [langc,setLangC] = useState([])

  const [islogin, setIslogin] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setIslogin(true)
    } else {
      alert('로그인상태가아냐!')
      router.push('/')
    }
  }, []);
  const router = useRouter()
  const [profile, setProfile] = useState<any>([]);
  // 타입스크립트 설정.. ㅠㅡㅠ
  const getProfile = () => {
    axios({
      url: "https://blahblah.community:8443/api/user/me",
      method: "get",
      headers: setToken(),
    }).then((res) => {
      console.log(res)
      setProfile(res.data);
      setLang(res.data['langInfos'])
      // console.log(res.body)
      console.log(res.data)
    });
  };
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };
  useEffect(() => {
    if (islogin) {
      getProfile();
    }
  }, [islogin]);

  useEffect(()=>{
    if(lang.length!==0){
      console.log('됫다!')
      for(let i=0;i<Object.keys(lang).length;i++){
        // console.log(lang[i]['level'])
        // console.log(lang[i])
        // console.log(lang[i]['langId'])
        if(lang[i]['level']===1 ||lang[i]['level']===2 || lang[i]['level']===3){
          var newarr:any = [...langa]
          // newarr.push(lang[i]['lang_id'])
          newarr.push(lang[i]['langId'])
          // newarr.push(3)
          setLangA(newarr)
        }else if(lang[i]['level']===4){
          var newarr:any  = [...langb]
          newarr.push(lang[i]['langId'])
          setLangB(newarr)
        }
        else if(lang[i]['level']===5){
          var newarr:any  = [...langc]
          // any형식의 인수는never형식에 할당할 수없음, 배열도any로 설정
          newarr.push(lang[i]['langId'])
          setLangC(newarr)
        }
      }
    }
  },[lang])

  return (
    <>

      <Container>
        <Row>
          <Col sm={3} sx={3}>
            <Card style={{ width: '16rem', margin: '20px' }}>
              <Card.Body>
                <Card.Title>친구목록</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>최근친구1</ListGroup.Item>
                  <ListGroup.Item>최근친구2</ListGroup.Item>
                  <ListGroup.Item>최근친구3</ListGroup.Item>
                </ListGroup>
                <a className="linkmenu" onClick={() => {
                  router.push('/user/friends')
                }}>팔로잉, 팔로워</a>
              </Card.Body>
            </Card>

            <Card style={{ width: '16rem', margin: '20px' }}>
              <Card.Body>
                <Card.Title>내가 작성한 피드</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>최근작성글</ListGroup.Item>
                  <ListGroup.Item>최근작성글</ListGroup.Item>
                  <ListGroup.Item>최근작성글</ListGroup.Item>
                </ListGroup>
                <a className="linkmenu">전체목록 보러가기</a>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} sx={6}>
            <div className="mypage">
            <Avatar
        alt="ProfileImage"
        src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/profile/${profile.profileImg}`}
        // src="/user/young-man.png"
        sx={{ width: 100, height: 100 }}
      />
              {/* <Figure>
                <Figure.Image
                  width={171}
                  height={180}
                  src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/profile/${profile.profileImg}`}
                />
              </Figure> */}
            </div>
            <ListGroup variant="flush">
              <ListGroup.Item>이름:{profile.name}</ListGroup.Item>
              <ListGroup.Item>이메일주소:{profile.email}</ListGroup.Item>
              <ListGroup.Item>모국어:{
          langc
          ?<>
          {
            langc.map((a,i)=>{
              return <span key={i}>
                  {larr[a-1]}
                  <img src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/language/${lImg[larr[a-1]]}.png`} width={25}
                  style={{margin:'5px'}}></img>
              </span>
            })
          }
          </>        
          :null
        }</ListGroup.Item>
              <ListGroup.Item>구사언어:{
          langb
          ?<span>
          {
            langb.map((a,i)=>{
              return <span key={i}>
                
                      {larr[a-1]} 
                      <img style={{margin:'5px'}}
                      src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/language/${lImg[larr[a-1]]}.png`} width={25}></img>

              </span>
            })
          }
          </span>
          :null
        }</ListGroup.Item>
              <ListGroup.Item>학습언어:{
          langa
          ?<span>
          {
            langa.map((a,i)=>{
              return <span key={i}>
                
           {larr[a-1]} 
                      <img style={{margin:'5px'}}
                      src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/language/${lImg[larr[a-1]]}.png`} width={25}></img>

              </span>
            })
          }
          </span>
          :null
        }</ListGroup.Item>
              <ListGroup.Item>성별:{profile.gender === 1
                ? <>여자</>
                : <>남자</>
              }</ListGroup.Item>
              <ListGroup.Item>나이:{profile.age}</ListGroup.Item>
              <ListGroup.Item>자기소개:{profile.description}</ListGroup.Item>
              <Button onClick={() => {
                router.push('/user/langupdate')
              }} style={{margin:'5px'}}
              className="btncs" variant="outline-secondary">언어수정</Button>
              <Button onClick={() => {
                router.push('/user/profileupdate')
              }} style={{margin:'5px'}}
              className="btncs" variant="outline-secondary">프로필수정</Button>
              <Button onClick={() => {
                router.push('/user/passupdate') 
              }} style={{margin:'5px'}}
              className="btncs" variant="outline-secondary">비밀번호수정</Button>
            </ListGroup>
          </Col>
          <Col sm={3} sx={3}>
            <Card style={{ width: '16rem', margin: '20px' }}>
              <Card.Body>
                <Card.Title>단어장</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>최근추가한 단어1</ListGroup.Item>
                  <ListGroup.Item>최근추가한 단어2</ListGroup.Item>
                  <ListGroup.Item>최근추가한 단어3</ListGroup.Item>
                </ListGroup>
                <a className="linkmenu">전체단어 보러가기</a>
              </Card.Body>
            </Card>
            <Card style={{ width: '16rem', margin: '20px' }}>
              <Card.Body>
                <Card.Title>문의내역</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>최근 문의 내역1</ListGroup.Item>
                  <ListGroup.Item>최근 문의 내역2</ListGroup.Item>
                  <ListGroup.Item>최근 문의 내역3</ListGroup.Item>
                </ListGroup>
                <a className="linkmenu">전체문의 보러가기</a>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>
      <style jsx>{`
        
        .mypage {
          display: flex;
  align-items: center;
  justify-content: center;
        }
        
          .linkmenu {
            color: black;
            text-decoration-line: none;
            display: inline;
            align-items:center;
            font-weight:bold;
            font-size: 14px;
            margin-bottom:0;
            cursor: pointer;
          }
          .linkmenu:hover{
            color:#00ccb1;
          }

      `}</style>
    </>
  )
}