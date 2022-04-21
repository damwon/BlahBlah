import UserNav from '../../component/user/userNav'
import { useRouter } from "next/router";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { useState } from "react";

export default function Signup() {
  const Router = useRouter();

  // 이메일
  const [inputEmail, setInputEmail] = useState("");
  const [isEmailOnly, setIsEmailOnly] = useState(false);


  // 비밀번호
  const [password, setPassword] = useState("")
  const [pwcheck,setPwcheck] = useState("")
  const [pwsame,setPwsame] = useState(true)

  // 이메일 입력부분
  const handleEmail = (event: any) => {
    //event.preventDefault();
    // 중복검사 했어도, 이메일 바꾸면 재검사
    setIsEmailOnly((prevState) => false);
    setInputEmail(event.target.value);

  };
  // 이메일 중복체크
  const onClickEmailCheck = () => {
    const email = inputEmail;
    const regEmail =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    // 이메일 형식, 중복 확인
    if (regEmail.test(email) === true) {
      axios
        .post("이메일체크api", {
          inputEmail: inputEmail,
        })
        // 중복되지 않는 경우, 중복검사 확인
        .then(function (response) {
          if (response.status === 200) {
            setIsEmailOnly((prevState) => true);
          }
        })
        // 중복되는 경우, 다시 중복검사 + 알림(이미 사용중인 이메일)
        .catch(function (error) {
          alert("이미 사용중인 이메일입니다.");
          setIsEmailOnly((prevState) => false);
        });
      // 이메일 형식 X, 다시 중복검사 + 알림(메일 형식 아님)
    } else {
      alert("이메일 형식이 아닙니다.");
    }
  };

  // 비밀번호 입력부분
  const handlePassword = (event: any) => {
    //event.preventDefault();
    setPassword(event.target.value);
  };
  const handlePwcheck = (event:any) =>{
    //event.preventDefault();
    setPwcheck(event.target.value)
  }
  // onchange 같은걸로 비밀번호 체크해주기


  const onSubmit = (event:any)=>{
    // alert('hi')
    // 이메일 중복아니고, 이메일형식이고
    // 패스워드 같은거 확인되면 전송하기
    if(password===pwcheck){
      alert('패스워드가 같습니다')
    }else{
      alert('패스워드가 다릅니다.')
    }
    // axios({
    //   url: `회원가입api주소`,
    //   method: "post",
    //   data: {
    //     email: inputEmail,
    //     password: password,
    //   },
    // })
    //   .then((res) => {
    //     console.log(res)
    //     Router.push({
    //       pathname: "/",
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  

  

  return (
    <>
      <Container>

        <Row>
          <Col></Col>
          <Col><h1>회원가입</h1>
            {inputEmail}
            {password}
            {pwcheck}
            <div className='logdiv'>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>이메일주소</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" onChange={handleEmail} />
                  <button  onClick={onClickEmailCheck}>
                  이메일 중복체크
                </button>
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>패스워드</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={handlePassword} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>패스워드확인</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={handlePwcheck} />
                </Form.Group>
                
                <button type="submit" onClick={onSubmit}>
                  가입
                </button>
                {/* <Button variant="primary" type="submit" >
                  로그인
                </Button> */}
              </Form>
            </div></Col>
          <Col></Col>
        </Row>
      </Container>

      <style jsx>{`
        
        .logdiv {
          width:300px;
          margin-top:50px;
        }

      `}</style>
    </>
  )
}