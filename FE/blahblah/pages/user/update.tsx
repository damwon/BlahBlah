/* eslint-disable */
import { Container,Row,Col,Form } from 'react-bootstrap';
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";


export default function Update() {
  const router = useRouter()

    // 프로필 이미지
  const [proimg,setProimg] = useState('0')
  const imgarr = ['0','1','2','3','4','5','6','7','8','9']
  const handleProimg = (e:any)=>{
    setProimg(e.currentTarget.value)
  }
  return (
    <>
      <Container>
        <Row>
      <Col>
      <h1>회원정보수정 진행</h1>
      <div style={{ width: '16rem',margin:'20px' }}>자기소개
      <input></input>
</div>
      <div style={{ width: '16rem',margin:'20px' }}>
      이름
      <input></input>
      </div>
<div style={{ width: '16rem',margin:'20px' }}>
프로필이미지
      <Form.Select aria-label="Default select example"
onChange={handleProimg} value={proimg}>
  <option>이미지고르기 </option>
  {imgarr.map((item, index)=>(
			<option key={index} value={item}>{item}</option>
		))}
</Form.Select>
  </div>
      <button>수정하기</button>
      <button onClick={()=>{
        router.push('/user/mypage')
      }}>마이페이지 돌아가기</button>
      </Col>
        </Row>
  
    </Container>
    </>
  )
}