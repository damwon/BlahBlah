/* eslint-disable */
import { Container,Row,Col,Form } from 'react-bootstrap';
import axios from "axios";
import { useRouter } from "next/router";
import { useState,useEffect } from "react";


export default function ProfileUpdate() {
  const router = useRouter()
  //자기소개
  const [des,setDes] = useState('')
  const handleDes = (e:any)=>{
    setDes(e.currentTarget.value)
  }
  //이름
  const [name,setName] = useState('')
  const handleName = (e:any)=>{
    setName(e.currentTarget.value)
  }
  // 프로필 이미지
  const [proimg,setProimg] = useState('0')
  const imgarr = ['0','1','2','3','4','5','6','7','8','9']
  const handleProimg = (e:any)=>{
    setProimg(e.currentTarget.value)
  }
  // 프로필 업데이트
  const onEdit = (event:any) => {
    event.preventDefault();
    axios({
      url: `https://blahblah.community:8443/api/user/edit`,
      method: "put",
      headers: setToken(),
      data: {
        "name":name,
        "description":des,
        "profileImg":proimg,
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
  // 본인 정보 저장
  const [profile, setProfile] = useState<any>([]);
  // 본인 정보
  const getProfile = () => {
    axios({
      url: `https://blahblah.community:8443/api/user/me`,
      method: "get",
      headers: setToken(),
    }).then((res) => {
      console.log(res)
      setProfile(res.data);
      console.log(res.data)
    });
  };

  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <>
      <Container>
        <Row>
      <Col>
      <h1>회원정보수정 진행</h1>
      {des}
      <div style={{ width: '16rem',margin:'20px' }}>자기소개 - {profile.description}
      <input onChange={handleDes}></input>
</div>
{name}
      <div style={{ width: '16rem',margin:'20px' }}>
      이름 - {profile.name}
      <input onChange={handleName}></input>
      </div>
      {proimg}
<div style={{ width: '16rem',margin:'20px' }}>
프로필이미지 - {profile.profileImg}
      <Form.Select aria-label="Default select example"
onChange={handleProimg} value={proimg}>
  <option>이미지고르기 </option>
  {imgarr.map((item, index)=>(
			<option key={index} value={item}>{item}</option>
		))}
</Form.Select>
  </div>
      <button onClick={onEdit}>수정하기</button>
      <button onClick={()=>{
        router.push('/user/mypage')
      }}>마이페이지 돌아가기</button>
      </Col>
        </Row>
  
    </Container>
    </>
  )
}