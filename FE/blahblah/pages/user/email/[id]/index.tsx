/* eslint-disable */
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { useEffect,useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import { Email } from '@mui/icons-material';
import Swal from "sweetalert2";


export default function EmailCheck() {
  const router = useRouter();
  const {id} = router.query
  const [key,setKey] = useState()
  const [isCheck,setIsCheck] = useState(false)

  const onEmailCheck = () => {
    axios({
      method:'get',
      url:`https://blahblah.community:8443/api/user/authemail/${id}`,
    })
    .then((result)=>{
    //  console.log('이메일인증 요청성공')
     Swal.fire({
      title: "Success",
      confirmButtonColor: "#00ccb1",
    });
     setIsCheck(true)
    //  console.log(result)
    //  console.log(result.data)
     setKey(result.data)
  })
    .catch((error)=>{
      // console.log('이메일인증 요청실패')
      Swal.fire({
        title: "Fail",
        confirmButtonColor: "#00ccb1",
      });
    console.log(error)  
  })
  };

  // 페이지 넘어오자마자 이메일 인증체크!
  useEffect(() => {
    onEmailCheck()
  }, [id]);




  return (
    <>
      
      <Container>

        <Row>
          <Col>
        
          </Col>
          <Col>
          {/* <h1>넘어온 키값 {id}</h1> */}
          {/* {key} */}
          {/* <button onClick={onEmailCheck}>체크해바</button> */}
          {
            isCheck
            ?<>Email Check Success!
            {/* <button onClick={()=>{
              router.push(
                {
                  pathname: "/user/signupm",
                  query: {
                    email:key,
                  },
                },
                `/user/signupm`)
            }}>회원가입넘어가기</button> */}
            <Button onClick={()=>{
              router.push(
                {
                  pathname: "/user/signupm",
                  query: {
                    email:key,
                  },
                },
                `/user/signupm`)
            }}
                    className="btncs" variant="outline-secondary">Go to Sign Up</Button>
            </>
            :<>Email Check Fail </>
          }
               
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