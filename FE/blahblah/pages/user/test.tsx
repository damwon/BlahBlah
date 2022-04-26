/* eslint-disable */
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { useEffect,useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'

export default function Login() {
  const onClickLogin = (event: any) => {
    event.preventDefault();
    axios({
      method:'get',
      url:`https://blahblah.community:8443/api/user/me`,
    })
    .then((result)=>{
     console.log('get요청성공')
     console.log(result)
  })
    .catch((error)=>{console.log('요청실패')
    console.log(error)  
  })
  };
  return (
    <>
      
      <Container>

        <Row>
          <Col></Col>
          <Col>
                <button type="submit" onClick={onClickLogin}>
                  테스트
                </button>

               
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