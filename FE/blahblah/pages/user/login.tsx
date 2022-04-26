/* eslint-disable */
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { useEffect,useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'

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
        // alert 오류출력

      });
  };
  // 로그인상태인데 로그인창오면 메인페이지로
  const [isLogin,setIslogin] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log('로그인후 NavBar에서 jwt읽기')
    // console.log(localStorage.getItem("jwt"))
    if (token) {
      setIslogin(true)
      router.push("/user")
    }
  }, []);
  return (
    <>
      
      <Container>

        <Row>
          <Col></Col>
          <Col><h1>로그인</h1>
            {email}
            {password}
            <div className='logdiv'>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>이메일주소</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" onChange={handleEmail} />
                  {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text> */}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>패스워드</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={handlePassword} />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <button type="submit" onClick={onClickLogin}>
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
                </button>
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