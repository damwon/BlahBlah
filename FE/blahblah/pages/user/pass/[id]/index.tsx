/* eslint-disable */
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { useEffect,useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'

export default function Regist() {
  const router = useRouter();
  const {id} = router.query

  // 비밀번호
  const [pass, setPass] = useState('')
  const [passcheck, setPassCheck] = useState('')
  const handlePass = (e: any) => {
    setPass(e.currentTarget.value)

  }
  const handlePassCheck = (e: any) => {
    setPassCheck(e.currentTarget.value)

  }
  const onEdit = (event: any) => {
    event.preventDefault();
    axios({
      url: `https://blahblah.community:8443/api/user/password/${id}`,
      method: "put",
      // headers: setToken(),
      data: {
        "password":pass
      },
    })
      .then((res) => {
        console.log('비밀번호 수정성공')
        console.log(res)

      })
      .catch((err) => {
        console.log('비밀번호 수정실패')
        console.log(err);
      });
  };



  return (
    <>
      
      <Container>

        <Row>
          <Col>
        
          </Col>
          <Col>
          <h1>비밀번호 수정</h1>
          {/* 넘어온 key값{id} */}
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

            <div style={{ width: '16rem', margin: '20px' }}>
              <label>비밀번호</label>
              <input type="password" onChange={handlePass} maxLength={15}></input>
              <label>비번확인</label>
              <input type="password" onChange={handlePassCheck} maxLength={15}></input>
            </div>
            <Button onClick={onEdit}
              style={{ marginBottom: '20px' }} variant="outline-dark">수정하기</Button>
               
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