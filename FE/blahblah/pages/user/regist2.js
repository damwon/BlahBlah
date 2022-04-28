/* eslint-disable */
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { useEffect,useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'

export default function Regist() {


  const [code,setCode] = useState('')
  const [file,setFile] = useState()
  const [name,setName] = useState('')
  const handlecode = (event) => {
    event.preventDefault();
    setCode(event.target.value);
  };
  const handlename = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };
 
  const onChangeImg = (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    
    if(e.target.files){
      const uploadFile = e.target.files[0]
      formData.append('file',uploadFile)
      setFile(uploadFile)
      console.log(uploadFile)
      console.log('===useState===')
      console.log(file)
    }
  }
  const onPrint = ()=>{
    console.log(file)
  }
  

  const onClickLogin = (event) => {
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

  const onClickLogin2 = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('code',code)
    formData.append('file',file)
    formData.append('engName',name)
    axios({
      method:'post',
      url:'https://blahblah.community:8443/api/lang/regist',
      data: formData,
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
        
          </Col>
          <Col>
          <h1>국가코드등록이미지등록어쩌구 저쩌구페이지</h1>
          {/* {file} */}
          언어코드{code}<input type="text" onChange={handlecode}></input>
          <form>
  <label htmlFor="profile-upload" />
  <input type="file" id="profile-upload" accept="image/*" onChange={onChangeImg}/>
</form>
          국가명{name}<input type="text" onChange={handlename}></input>
          <button onClick={onClickLogin2}>제출어쩌구저쩌구</button>
          <button onClick={onPrint}>쩐다</button>
                {/* <button type="submit" onClick={onClickLogin}>
                  테스트get
                </button>

                <button type="submit" onClick={onClickLogin2}>
                  테스트post
                </button> */}

               
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