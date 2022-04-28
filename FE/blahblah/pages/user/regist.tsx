/* eslint-disable */
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { useEffect,useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'

export default function Regist() {


  const [code,setCode] = useState('')
  const [file,setFilfe] = useState<any>()
  const [name,setNme] = useState('')
 
  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const formData = new FormData();
    
    
    if(e.target.files){
      const uploadFile = e.target.files[0]
      formData.append('file',uploadFile)
      setFilfe(uploadFile)
      console.log(uploadFile)
      console.log('===useState===')
      console.log(file)
    }
  }
  const onPrint = ()=>{
    console.log(file)
  }
  

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

  const onClickLogin2 = (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('code',code)
    formData.append('file',file)
    // any로 바꾸니까 되네용..? 휴우!! file속성 안줘도 되네
    formData.append('engName',name)
    axios({
      method:'post',
      url:'https://blahblah.community:8443/api/ang/regist',
      data: {
        
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
        
          </Col>
          <Col>
          <h1>국가코드등록이미지등록어쩌구 저쩌구페이지</h1>
          {/* {file} */}
          언어코드{code}<input type="text"></input>
          <form>
  <label htmlFor="profile-upload" />
  <input type="file" id="profile-upload" accept="image/*" onChange={onChangeImg}/>
</form>
          국가명{name}<input type="text"></input>
          <button>제출어쩌구저쩌구</button>
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