/* eslint-disable */
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";


export default function PassUpdate() {
  const router = useRouter()
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };

  const [pass, setPass] = useState('')
  const [passcheck, setPassCheck] = useState('')
  const handlePass = (e: any) => {
    setPass(e.currentTarget.value)

  }
  const handlePassCheck = (e: any) => {
    setPassCheck(e.currentTarget.value)

  }

  const onEditPassword = (event: any) => {
    event.preventDefault();
    if (pass.length >= 6) {
      axios({
        url: `https://blahblah.community:8443/api/user/edit-password`,
        method: "put",
        headers: setToken(),
        data: {
          'password': pass,
        },
      })
        .then((res) => {
          console.log(res)
          router.push('/user/mypage')
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('비밀번호 6자이상써줘!')
    }
  };



  return (
    <>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <h1>비밀번호변경</h1>
            {
              pass === passcheck && pass.length >= 1
                ? <>비밀번호가 같습니다.</>
                : null
            }
            {
              pass !== passcheck && pass.length >= 1 && passcheck.length >= 1
                ? <>비밀번호가 다릅니다.</>
                : null
            }
            <Form>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
    {/* <Form.Label column sm="2">
      Password
    </Form.Label> */}
    <Col sm="10">
      <Form.Control type="password" placeholder="Password" onChange={handlePass} maxLength={15}/>
    </Col>
  </Form.Group>
  <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
    {/* <Form.Label column sm="2">
      Password Check
    </Form.Label> */}
    <Col sm="10">
      <Form.Control type="password" placeholder="Password Check" onChange={handlePassCheck} maxLength={15}/>
    </Col>
  </Form.Group>
            </Form>

            {/* <div style={{ width: '16rem', margin: '20px' }}>
              <label>비밀번호</label>
              <input type="password" onChange={handlePass} maxLength={15}></input>
              <label>비번확인</label>
              <input type="password" onChange={handlePassCheck} maxLength={15}></input>
            </div> */}
            <Button onClick={onEditPassword}
              style={{ marginBottom: '20px' }} variant="outline-dark">수정하기</Button>
            <Button onClick={() => {
              router.push('/user/mypage')
            }}
              style={{ marginBottom: '20px' }} variant="outline-dark">마이페이지 돌아가기</Button>
            {/* <button onClick={onEditPassword}>수정하기</button>
            <button onClick={() => {
              router.push('/user/mypage')
            }}>마이페이지</button> */}
          </Col>
          <Col>
            {/* <ListGroup variant="flush">
              <ListGroup.Item></ListGroup.Item>
            </ListGroup> */}
          </Col>

        </Row>

      </Container>
    </>
  )
}