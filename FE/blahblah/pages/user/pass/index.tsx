/* eslint-disable */
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { useEffect,useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'

export default function Regist() {

  // 이메일
  const [inputEmail, setInputEmail] = useState("");
  // 이메일 중복체크후 이메일 인증버튼 나오게
  const [EmailCheck, setEmailCheck] = useState(false)
  // 그리고 이메일창 onchange 있으면 둘다 초기화
  // 이메일 입력부분
  const handleEmail = (event: any) => {
    event.preventDefault();
    setInputEmail(event.target.value);
    // 이메일 인증 초기화
    setEmailCheck(false)
  };
  // 이메일 중복체크
  const onClickEmailCheck = () => {
    const email = inputEmail;
    const regEmail =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    // 이메일 형식, 중복 확인
    if (regEmail.test(email) === true) {
      axios
        .post("https://blahblah.community:8443/api/user/find-password", {
          'email': inputEmail,
        })
        // 중복되지 않는 경우, 중복검사 확인
        .then(function (response) {
          if (response.status === 200) {
            console.log('이메일 전송 성공')
            setEmailCheck((prevState) => true)
          }
        })
        // 중복되는 경우, 다시 중복검사 + 알림(이미 사용중인 이메일)
        .catch(function (error) {
          console.log(error)
        });
      // 이메일 형식 X, 다시 중복검사 + 알림(메일 형식 아님)
    } else {
      alert("이메일 형식이 아닙니다.");
    }
  };



  return (
    <>
      
      <Container>

        <Row>
          <Col>
        
          </Col>
          <Col>
          <h1>Find Password</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>
                  {/* 이메일주소  */}
                  {/* {inputEmail} */}
                  </Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={handleEmail} />
                <Button onClick={onClickEmailCheck} 
                  className="btncs" variant="outline-secondary">Send Email</Button>
               
          

              </Form.Group>
               
            </Col>
          <Col></Col>
        </Row>
      </Container>

      <style jsx>{`
        
        .logdiv {
          width:300px;
          margin-top:50px;
        }
        .link {
          color: black;
          text-decoration-line: none;
        }

      `}</style>
    </>
  )
}