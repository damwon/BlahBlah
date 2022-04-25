/* eslint-disable */
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { useState } from "react";
import Link from "next/link";


export default function Login() {
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleEmail = (event: any) => {
    event.preventDefault();
    // React.ChangeEvent<HTMLInputElement>
    setEmail(event.target.value);
  };
  const handlePassword = (event: any) => {
    event.preventDefault();
    setPassword(event.target.value);
  };
  const onClickLogin = (event: any) => {
    event.preventDefault();
    axios
      .post(``, {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)

      });
  };
  return (
    <>
      
      <Container>

        <Row>
          <Col></Col>
          <Col><h1>로그인</h1>
            {email}
            {password}
            <div className='logdiv'>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>이메일주소</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" onChange={handleEmail} />
                  {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text> */}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>패스워드</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={handlePassword} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <button type="submit" onClick={() => { console.log('hihi') }}>
                  로그인
                </button>

                <button  >
                  <Link href="/user/signup">
                    <a className="link">회원가입 </a>
                  </Link>
                </button>
                {/* <Button variant="primary" type="submit">
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
        .link {
          color: black;
          text-decoration-line: none;
        }

      `}</style>
    </>
  )
}