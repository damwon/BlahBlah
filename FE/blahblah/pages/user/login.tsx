/* eslint-disable */
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
// import '../../styles/test.css'
export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleEmail = (event: any) => {
    event.preventDefault();
    // React.ChangeEvent<HTMLInputElement>
    setEmail(event.target.value);
  };
  const handlePassword = (event: any) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      axios
        .post(`https://blahblah.community:8443/api/auth/login`, {
          'email': email,
          'password': password,
        })
        .then((res) => {
          localStorage.setItem("jwt", res.data.accessToken);
          console.log(res)
          location.reload()
          // router.replace('/user')
          // router.push("/user")
          // 리다이렉트를하자
        })
        .catch((err) => {
          console.log(err)
          // 여기 에러중에 403이면 body값 출력하기
          alert('제대로 입력해')
          // alert 오류출력

        });
    }
  }
  const onClickLogin = (event: any) => {
    event.preventDefault();
    axios
      .post(`https://blahblah.community:8443/api/auth/login`, {
        'email': email,
        'password': password,
      })
      .then((res) => {
        localStorage.setItem("jwt", res.data.accessToken);
        console.log(res)
        location.reload()
        // router.replace('/user')
        // router.push("/user")
        // 리다이렉트를하자
      })
      .catch((err) => {
        console.log(err)
        alert('Fail')
        // alert 오류출력

      });
  };
  // 로그인상태인데 로그인창오면 메인페이지로
  const [isLogin, setIslogin] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log('로그인후 NavBar에서 jwt읽기')
    // console.log(localStorage.getItem("jwt"))
    if (token) {
      setIslogin(true)
      router.push("/")
    }
  }, []);
  return (
    <>

      <Container>

        <Row>
          <Col></Col>
          <Col><h1>Login</h1>
            {/* {email}
            {password} */}
            <div className='logdiv'>
            
              <Form id='formtest'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                  className="formct"
                  // style={{borderColor:'red'}}
                  onKeyUp={handleKeyPress} type="email" placeholder="Enter email" onChange={handleEmail} />
                  {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text> */}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control className="formct" onKeyUp={handleKeyPress} type="password" placeholder="Password" onChange={handlePassword} />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <Button onClick={onClickLogin} className="btncs" 
                   variant="outline-secondary">Login</Button>
                <Button className="btncs" onClick={() => {
                  router.push('/user/email')
                }}
                   variant="outline-secondary">Sign Up</Button>
                <Button  onClick={() => {
                  router.push('/user/pass')
                }}
                   variant="outline-secondary">Find Password</Button>
                  {/* <Button className="btnc" id="btbt">커스텀 연습</Button> */}
                {/* <button type="submit" onClick={onClickLogin}>
                  로그인
                </button>

                <button  >
                  <Link href="/user/signup">
                    <a className="link">회원가입 </a>
                  </Link>
                </button>
                <button  >
                  <Link href="/user/findpass">
                    <a className="link">비밀번호찾기 </a>
                  </Link>
                </button> */}
                {/* <Button variant="primary" type="submit">
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
        .link {
          color: black;
          text-decoration-line: none;
        }

      
    


        
        

      `}</style>
    </>
  )
}