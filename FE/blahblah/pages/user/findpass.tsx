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
        alert("Check your Email Message");
      })
      .catch((err) => {
        console.log(err);
        alert('Enter Correctly')
      });
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Find Password</h1>
            Input Your Email
            {email}
            <div>
              <input onChange={handleEmail}></input>
            </div>
            <Button onClick={onCheckEmail}
              style={{ marginBottom: '20px' }} variant="outline-dark">Send Confirm Email Message</Button>
            <Button onClick={() => {
              router.push('/user/login')
            }}
              style={{ marginBottom: '20px' }} variant="outline-dark">Go to Login</Button>
            {/* <button onClick={onCheckEmail}>눌러버튼</button> */}
          </Col>
        </Row>

      </Container>

    </>
  )
}