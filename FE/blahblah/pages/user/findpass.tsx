/* eslint-disable */
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
export default function Findpass() {
  const router = useRouter()

  const [email, setEmail] = useState("");
  const handleEmail = (event: any) => {
    event.preventDefault();
    setEmail(event.target.value);
  };
  const onCheckEmail = (event: any) => {
    event.preventDefault();
    axios({
      url: `https://blahblah.community:8443/api/user/find-password`,
      method: "post",
      data: {
        'email': email,
      },
    })
      .then(() => {
        setEmail("");
        alert("인증메일 확인해");
      })
      .catch((err) => {
        console.log(err);
        alert('제대로 입력해')
      });
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>비밀번호찾기</h1>
            이메일입력해
            {email}
            <div>
              <input onChange={handleEmail}></input>
            </div>
            <Button onClick={onCheckEmail}
              style={{ marginBottom: '20px' }} variant="outline-dark">인증메일보내기</Button>
            <Button onClick={() => {
              router.push('/user/login')
            }}
              style={{ marginBottom: '20px' }} variant="outline-dark">로그인하러가기</Button>
            {/* <button onClick={onCheckEmail}>눌러버튼</button> */}
          </Col>
        </Row>

      </Container>

    </>
  )
}