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

  const onClickLogin2 = (event: any) => {
    event.preventDefault();
    axios({
      method:'post',
      url:'https://blahblah.community:8443/api/user/checkemail',
      data: {
        'email':'flykimjiwon22@gmail.com'
      },
    })
    .then((result)=>{console.log('요청성공')
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
          <Col>
          


<hr/>


   
    
    
          </Col>
          <Col>
                <button type="submit" onClick={onClickLogin}>
                  테스트get
                </button>

                <button type="submit" onClick={onClickLogin2}>
                  테스트post
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