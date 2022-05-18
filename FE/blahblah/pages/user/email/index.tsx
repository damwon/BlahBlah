/* eslint-disable */
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { useEffect,useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import Swal from "sweetalert2";


export default function Regist() {

  // 이메일
  const [inputEmail, setInputEmail] = useState("");
  // 이메일 중복체크
  const [isEmailOnly, setIsEmailOnly] = useState(false);
  // 이메일 중복체크후 이메일 인증버튼 나오게
  const [EmailCheck, setEmailCheck] = useState(false)
  // 그리고 이메일창 onchange 있으면 둘다 초기화
  // 이메일 입력부분
  const handleEmail = (event: any) => {
    event.preventDefault();
    setInputEmail(event.target.value);
    // 이메일중복체크, 이메일인증 초기화
    setIsEmailOnly(false)
    setEmailCheck(false)
  };
  // 이메일 중복체크
  const onClickEmailCheck = () => {
    const email = inputEmail;
    const regEmail =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    // 이메일 형식, 중복 확인
    if (regEmail.test(email) === true) {
      axios
        .post("https://blahblah.community:8443/api/user/signup/duplicate-check-email", {
          'email': inputEmail,
        })
        // 중복되지 않는 경우, 중복검사 확인
        .then(function (response) {
          if (response.status === 200) {
            console.log('이메일 중복체크 성공')
            setIsEmailOnly((prevState) => true);
            setEmailCheck((prevState) => true)
          }
        })
        // 중복되는 경우, 다시 중복검사 + 알림(이미 사용중인 이메일)
        .catch(function (error) {
          console.log('이메일중복에러')
          console.log(error)
          // alert("already ");
          Swal.fire({
            title: "Email Already In Use",
            confirmButtonColor: "#00ccb1",
          });
          
          setIsEmailOnly((prevState) => false);
        });
      // 이메일 형식 X, 다시 중복검사 + 알림(메일 형식 아님)
    } else {
      // alert("이메일 형식이 아닙니다.");
      Swal.fire({
        title: "Not Email Type",
        confirmButtonColor: "#00ccb1",
      });
    }
  };


  const onSendEmail = (event: any) => {

    axios({
      method:'post',
      url:'https://blahblah.community:8443/api/user/checkemail',
      data: {
        "email":inputEmail
      },
    })
    .then((result)=>{
    console.log('이메일보내기 요청성공')
    // alert('Please Check Your Email')
    Swal.fire({
      title: "Please Check Your Email",
      confirmButtonColor: "#00ccb1",
    });
    console.log(result)
 
  })
    .catch((error)=>{
    console.log('이메일보내기 요청실패')
    // alert('Fail')
    Swal.fire({
      title: "Fail",
      confirmButtonColor: "#00ccb1",
    });
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
          <h1>Sign Up Email Check </h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
                {/* <Form.Label>이메일주소 {inputEmail}</Form.Label> */}
                <Form.Control className="formct" type="email" placeholder="Enter email" onChange={handleEmail} />
                <Button onClick={onClickEmailCheck} className="btncs"
                   variant="outline-dark">Email Check</Button>
               
                {EmailCheck === true
                  ? <><Button onClick = {onSendEmail}
                    style={{ marginTop: '5px' }} variant="outline-secondary">Email Message Check</Button>
                  </>
                  : null
                }

              </Form.Group>
               
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