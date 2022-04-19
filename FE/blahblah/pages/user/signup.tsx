import UserNav from '../../component/user/userNav'

import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { useState } from "react";

export default function Signup() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleEmail = (event: any) => {
    //event.preventDefault();
    setEmail(event.target.value);
  };
  const handlePassword = (event: any) => {
    //event.preventDefault();
    setPassword(event.target.value);
  };
  return (
    <>
      <UserNav></UserNav>
      <Container>

        <Row>
          <Col></Col>
          <Col><h1>회원가입</h1>
            {email}
            {password}
            <div className='logdiv'>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>이메일주소</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" onChange={handleEmail} />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>패스워드</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={handlePassword} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <button type="submit" onClick={() => { console.log('hihi') }}>
                  가입
                </button>
                {/* <Button variant="primary" type="submit" >
                  로그인
                </Button> */}
              </Form>
            </div></Col>
          <Col></Col>
        </Row>
      </Container>

      <style jsx>{`
        
        .logdiv {
          width:300px;
          margin-top:50px;
        }

      `}</style>
    </>
  )
}