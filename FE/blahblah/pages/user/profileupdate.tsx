/* eslint-disable */
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";


export default function ProfileUpdate() {
  const router = useRouter()
  //
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
  // 프로필이미지 변경여부
  const [imgState,setImgState] = useState<any>(1)
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
      setImgState(1)
    }
  }
  // 프로필 이미지
  // const [proimg, setProimg] = useState('0')
  // const imgarr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  // const handleProimg = (e: any) => {
  //   setProimg(e.currentTarget.value)
  // }
  // 프로필 업데이트
  // 기본 default파일일때 예외처리체크, 그 때 null넣어주기
  // default.png 이런 이름으로 가져오면, 그거 setFilfe(null) 처리
  // 그냥 아예 'file',null 이래도됨
  // 다필요업슨게 기본 초기값이 기본이미지, 그리고null이라 절대 default.png를 다시보낼 일이 없다.
  const onEdit = (event: any) => {
    const formData = new FormData();
    const info: any = {    
      "name": name,
      "description": des,
      "imgState":imgState,
    }
    formData.append('file', file)
    formData.append('info', new Blob([JSON.stringify(info)], { type: "application/json" }))

    event.preventDefault();
    axios({
      url: `https://blahblah.community:8443/api/user/edit`,
      method: "put",
      headers: setToken(),
      data: formData,
      // {
      //   "name": name,
      //   "description": des,
      //   "profileImg": profile.profileImg,
      // },
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
          <Col></Col>
          <Col>
            <h1>Profile Update</h1>
            {/* {des} */}
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>Name</Form.Label>
    <Form.Control className="formct" type="text" placeholder="New Name" onChange={handleName} maxLength={20}/>
  </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Description</Form.Label>
    <Form.Control className="formct" as="textarea" rows={3} onChange={handleDes}/>
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
              <Form.Label>you can upload your new image</Form.Label>
            
              <Form.Control className="formct" type="file" accept="image/*" size="sm" onChange={onChangeImg}/>
            </Form.Group>
            <div><Button onClick={()=>{
              setImgState(0)
            }} style={{ marginRight: '3px' }}variant="outline-secondary" size="sm">
      No change
    </Button>
    <Button onClick={()=>{
              setImgState(1)
              setFilfe(null)
            }} variant="outline-secondary" size="sm">
      Use default image
    </Button>
              </div>
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
              className="btncs" variant="outline-secondary">Edit</Button>
            <Button onClick={() => {
              router.push('/user/mypage')
            }}
              style={{ margin: '2px' }} variant="outline-secondary">Back to Mypage </Button>
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