/* eslint-disable */
import { Container,Row,Col } from 'react-bootstrap';
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from 'react';
export default function UpdateCheck() {
  const router = useRouter()
  const [password,setPassword] = useState('')
  const handlePassword = (event: any) => {
    event.preventDefault();
    setPassword(event.target.value);
  };
  return (
    <>
      <Container>
        <Row>
      <Col>
      <h1>회원정보수정,비번인증</h1>
      {password}
      <input type="password" onChange={handlePassword}></input>
      <button>확인</button>
      <button onClick={()=>{
        router.push('/user/update')
      }}>일단 다음페이지 테스트</button>
      </Col>
        </Row>
  
    </Container>
    </>
  )
}