/* eslint-disable */
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { useEffect,useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'

export default function Index() {

  const onClickLogin = (event: any) => {
    event.preventDefault();
    axios({
      method:'get',
      url:`https://blahblah.community:8443/api/user/`,
    })
    .then((result)=>{
     console.log('get요청성공')
     console.log(result)
     console.log(result.data)
  })
    .catch((error)=>{console.log('요청실패')
    console.log(error)  
  })
  };
  return (
    <>
    <Container>
    <Row>
      <Col>블라메이트
      <button type="submit" onClick={onClickLogin}>
                  테스트get
                </button></Col>
    </Row>
  </Container>
    </>
  )
}