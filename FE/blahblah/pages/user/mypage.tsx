/* eslint-disable */
import { Container,Row,Col,ListGroup,Figure ,Card,Button} from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Mypage() {
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
    getProfile();
  }, []);
  return (
    <>
      
      <Container>
        <Row>
        <Col sm = {3} sx = {3}>
        <Card style={{ width: '16rem',margin:'20px'  }}>
  <Card.Body>
    <Card.Title>친구목록</Card.Title>
    <ListGroup variant="flush">
    <ListGroup.Item>최근친구1</ListGroup.Item>
    <ListGroup.Item>최근친구2</ListGroup.Item>
    <ListGroup.Item>최근친구3</ListGroup.Item>
  </ListGroup>
  <a className="linkmenu" onClick={()=>{
    router.push('/user/friends')
  }}>전체친구 보러가기</a>
  </Card.Body>
</Card>

<Card style={{ width: '16rem',margin:'20px' }}>
  <Card.Body>
    <Card.Title>내가 작성한 피드</Card.Title>
    <ListGroup variant="flush">
    <ListGroup.Item>최근작성글1</ListGroup.Item>
    <ListGroup.Item>최근작성글</ListGroup.Item>
    <ListGroup.Item>최근작성글</ListGroup.Item>
  </ListGroup>
  <a className="linkmenu">전체목록 보러가기</a>
  </Card.Body>
</Card>
      </Col>
      <Col sm = {6} sx = {6}>
      <div className="mypage">
      <Figure>
  <Figure.Image
    width={171}
    height={180}
    src="/user/young-man.png"
  />
</Figure>
      </div>
      <ListGroup variant="flush">
  <ListGroup.Item>이름:{profile.name}</ListGroup.Item>
  <ListGroup.Item>이메일주소:{profile.email}</ListGroup.Item>
  <ListGroup.Item>모국어:</ListGroup.Item>
  <ListGroup.Item>구사언어:</ListGroup.Item>
  <ListGroup.Item>학습언어:</ListGroup.Item>
  <ListGroup.Item>성별:{profile.gender===0
  ?<>여자</>
  :<>남자</>
  }</ListGroup.Item>
  <ListGroup.Item>나이:{profile.age}</ListGroup.Item>
  <ListGroup.Item>자기소개:{profile.description}</ListGroup.Item>
  <Button onClick={()=>{
    router.push('/user/updatecheck')
  }}
  style={{ marginBottom:'20px' }} variant="outline-dark">회원정보수정</Button>
</ListGroup>
      </Col>
      <Col sm = {3} sx = {3}>
      <Card style={{ width: '16rem',margin:'20px' }}>
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
<Card style={{ width: '16rem',margin:'20px' }}>
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