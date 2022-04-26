/* eslint-disable */
import { Container,Row,Col,Form } from 'react-bootstrap';
import axios from "axios";
import { useRouter } from "next/router";
import { useState,useEffect } from "react";


export default function PassUpdate() {
  const router = useRouter()
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };
  
  const [pass,setPass] = useState('')
  const [passcheck,setPassCheck] = useState('')
  const handlePass = (e:any)=>{
    setPass(e.currentTarget.value)
  }
  const handlePassCheck = (e:any)=>{
    setPassCheck(e.currentTarget.value)
  }

  const onEditPassword = (event:any) => {
    event.preventDefault();
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
  };



  return (
    <>
      <Container>
        <Row>
      <Col>
      <h1>비밀번호변경</h1>
      {
        pass===passcheck && pass.length>=1
        ?<>비밀번호가 같습니다.</>
        :<>비밀번호가 다릅니다.</>
      }
      
      <div style={{ width: '16rem',margin:'20px' }}>
      비밀번호{pass}
      <input type="password" onChange={handlePass}></input>
      비밀번호 확인{passcheck}
      <input type="password" onChange={handlePassCheck}></input>
      </div>

      <button onClick={onEditPassword}>수정하기</button>
      <button onClick={()=>{
        router.push('/user/mypage')
      }}>마이페이지 돌아가기</button>
      </Col>
        </Row>
  
    </Container>
    </>
  )
}