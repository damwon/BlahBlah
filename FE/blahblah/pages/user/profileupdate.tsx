/* eslint-disable */
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";


export default function ProfileUpdate() {
  const router = useRouter()
  //자기소개
  const [des, setDes] = useState('')
  const handleDes = (e: any) => {
    setDes(e.currentTarget.value)
  }
  //이름
  const [name, setName] = useState('')
  const handleName = (e: any) => {
    setName(e.currentTarget.value)
  }
  // 프로필 이미지
  const [file, setFilfe] = useState<any>(null)
  // 이미지 업로드 안해놓으면 기본 null처리
  // 기본 이미지 사용 누르면 null되게 처리 추가하자
  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const formData = new FormData();


    if (e.target.files) {
      const uploadFile = e.target.files[0]
      formData.append('file', uploadFile)
      setFilfe(uploadFile)
      console.log(uploadFile)
      console.log('===useState===')
      console.log(file)
    }
  }
  // 프로필 이미지
  // const [proimg, setProimg] = useState('0')
  // const imgarr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  // const handleProimg = (e: any) => {
  //   setProimg(e.currentTarget.value)
  // }
  // 프로필 업데이트
  const onEdit = (event: any) => {
    event.preventDefault();
    axios({
      url: `https://blahblah.community:8443/api/user/edit`,
      method: "put",
      headers: setToken(),
      data: {
        "name": name,
        "description": des,
        "profileImg": profile.profileImg,
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
          <Col></Col>
          <Col>
            <h1>회원정보수정</h1>
            {/* {des} */}
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>이름</Form.Label>
    <Form.Control type="text" placeholder="New Name" onChange={handleName} maxLength={20}/>
  </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>자기소개</Form.Label>
    <Form.Control as="textarea" rows={3} onChange={handleDes}/>
  </Form.Group>
            </Form>
            {/* <div style={{ width: '16rem', margin: '20px' }}>자기소개
            {profile.description}
              <input onChange={handleDes}></input>
              
              <textarea onChange={handleDes} id="story" name="story"
                rows={5} cols={33}>

              </textarea>
            </div> */}
            {/* {name} */}
            {/* <div style={{ width: '16rem', margin: '20px' }}>
              이름
              <input onChange={handleName} maxLength={20}></input>
            </div> */}
            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>프로필 이미지를 업로드 해주세요</Form.Label>
              <Form.Control type="file" accept="image/*" size="sm" onChange={onChangeImg}/>
            </Form.Group>
            {/* {proimg} */}
            {/* <div style={{ width: '16rem', margin: '20px' }}>
              프로필이미지 - {profile.profileImg}
              <Form.Select aria-label="Default select example"
                onChange={handleProimg} value={proimg}>
                <option>이미지고르기 </option>
                {imgarr.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </Form.Select>
            </div> */}
            <Button onClick={onEdit}
              style={{ marginBottom: '20px' }} variant="outline-dark">수정하기</Button>
            <Button onClick={() => {
              router.push('/user/mypage')
            }}
              style={{ marginBottom: '20px' }} variant="outline-dark">마이페이지 돌아가기</Button>
            {/* <button onClick={onEdit}>수정하기</button>
            <button onClick={() => {
              router.push('/user/mypage')
            }}>마이페이지 돌아가기</button> */}
          </Col>
          <Col></Col>
        </Row>

      </Container>
    </>
  )
}