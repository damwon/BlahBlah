/* eslint-disable */
import { useRouter } from "next/router";
import { Form, Button, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import axios from "axios";
import { useState } from "react";

export default function Signup() {
  const Router = useRouter();
  const { query } = useRouter();
  const [email,setEmail] = useState(query.email)

  // 가입결과 테스트
  const [result, setResult] = useState(false)
  
  // 이름
  const [name, setName] = useState('')
  const handleName = (event: any) => {
    event.preventDefault();
    setName(event.target.value);
  };

  // 비밀번호
  const [password, setPassword] = useState("")
  const [pwcheck, setPwcheck] = useState("")
  const [pwsame, setPwsame] = useState(false)

  // 언어종류
  const languages = ['Korean', 'English', 'Japanese', 'Chinese', 'Spanish'
    , 'a', 'b', 'c', '....']
  // 모국어
  const [first, setFirst] = useState([])
  const handleFirst = (e: any) => {

    var array: any = [...first]
    // console.log(array.includes(input))
    if (array.includes(e.currentTarget.value) === false && array.length <= 1) {
      array.push(e.currentTarget.value)
    }

    setFirst(array);
  };
  // 구사언어
  const [second, setSecond] = useState([])
  const handleSecond = (e: any) => {
    var array: any = [...second]
    if (array.includes(e.currentTarget.value) === false && array.length <= 2) {
      array.push(e.currentTarget.value)
    }

    setSecond(array);
  };
  // 학습언어
  const [third, setThird] = useState([])
  const handleThird = (e: any) => {
    var array: any = [...third]
    if (array.includes(e.currentTarget.value) === false && array.length <= 3) {
      array.push(e.currentTarget.value)
    }

    setThird(array);
  };
  // 성별
  const [gen, setGen] = useState("")
  const gens = ['남자', '여자']
  const onGenHanlder = (e: any) => {
    setGen(e.currentTarget.value)
  }
  // 나이
  const [age, setAge] = useState(0)
  const ages = []
  for (var i = 0; i < 101; i++) {
    ages.push(i)
  }
  const onAgeHanlder = (e: any) => {
    setAge(e.currentTarget.value)
  }
  // 프로필
  const [profile, setProfile] = useState("")
  const handleProfile = (e: any) => {
    setProfile(e.currentTarget.value)
  }
  // 프로필 이미지
  const [proimg, setProimg] = useState('0')
  const imgarr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const handleProimg = (e: any) => {
    setProimg(e.currentTarget.value)
  }

  // 비밀번호 입력부분
  const handlePassword = (event: any) => {
    //event.preventDefault();
    setPassword(event.target.value);
  };
  const handlePwcheck = (event: any) => {
    //event.preventDefault();
    setPwcheck(event.target.value)
  }



  const onSubmit = (event: any) => {

    
    if (password.length >= 6 && password === pwcheck
      && first.length !== 0 && second.length !== 0
      && gen.length !== 0 && age == 0 && profile.length !== 0 && name.length !== 0) {
      alert('가입완료')
    } else {
      alert('빈칸이있음')
    }

    // axios({
    //   url: `https://blahblah.community:8443/api/user/signup`,
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
          {email}
          {/* 이거 이메일 빈녀석이면 예외처리 */}
            {/* const [result,setResult] = useState(false) */}




            <div className='logdiv'>
              
              {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>이메일주소 {inputEmail}</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={handleEmail} />
                <Button onClick={onClickEmailCheck}
                  style={{ marginTop: '5px' }} variant="outline-dark">이메일 중복체크</Button>
                
                {EmailCheck === true
                  ? <><Button
                    style={{ marginTop: '5px' }} variant="outline-dark">이메일 인증</Button>
                  </>
                  : null
                }

              </Form.Group> */}

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>이름{name}</Form.Label>
                <Form.Control type="text" placeholder="이름을입력하세요" onChange={handleName} maxLength={20} />

              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>패스워드 {password}</Form.Label>
                <Form.Control type="password" placeholder="6자이상 입력해주세요" onChange={handlePassword} maxLength={10} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>패스워드확인 {pwcheck}-
                  {
                    password === pwcheck && password.length >= 6
                      ? <>비밀번호가 같습니다.</>
                      : <>비밀번호가 다릅니다.</>
                  }

                </Form.Label>
                <Form.Control type="password" placeholder="6자이상 입력해주세요" onChange={handlePwcheck} maxLength={10} />
              </Form.Group>

              <Form.Label>- 추가정보 -</Form.Label>

              {gen}
              <Form.Select aria-label="Default select example"
                onChange={onGenHanlder} >
                <option>성별 </option>
                {gens.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </Form.Select>

              {age}
              <Form.Select aria-label="Default select example"
                onChange={onAgeHanlder} >
                <option>나이 </option>
                {ages.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </Form.Select>


              <hr />

              <Form.Label>모국어(2개까지) {first} </Form.Label>
              <Form.Select aria-label="Default select example"
                onChange={handleFirst} >
                <option>언어선택 </option>
                {languages.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </Form.Select>
              <Button onClick={() => {
                var newarr: any = []
                setFirst(newarr)
              }}
                style={{ marginTop: '5px' }} variant="outline-dark">초기화</Button>
              {/* <button onClick={() => {
                var newarr: any = []
                setFirst(newarr)
              }}>retry</button> */}
              <hr />
              <Form.Label>구사언어(3개까지) {second}</Form.Label>
              <Form.Select aria-label="Default select example"
                onChange={handleSecond} >
                <option>언어선택 </option>
                {languages.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </Form.Select>
              <Button onClick={() => {
                var newarr: any = []
                setSecond(newarr)
              }}
                style={{ marginTop: '5px' }} variant="outline-dark">초기화</Button>
              {/* <button onClick={() => {
                var newarr: any = []
                setSecond(newarr)
              }}>retry</button> */}
              <hr />
              <Form.Label>학습언어(4개까지) {third}</Form.Label>
              <Form.Select aria-label="Default select example"
                onChange={handleThird}
              // value={third}
              >
                <option>언어선택 </option>
                {languages.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </Form.Select>
              <Button onClick={() => {
                var newarr: any = []
                setThird(newarr)
              }}
                style={{ marginTop: '5px' }} variant="outline-dark">초기화</Button>
              {/* <button onClick={() => {
                var newarr: any = []
                setThird(newarr)
              }}>retry</button> */}

              <hr />
              <Form.Label>프로필이미지 {proimg}</Form.Label>
              <Form.Select aria-label="Default select example"
                onChange={handleProimg} value={proimg}>
                <option>이미지고르기 </option>
                {imgarr.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </Form.Select>
              <Button onClick={() => {
                setProimg('0')
              }}
                style={{ marginTop: '5px' }} variant="outline-dark">초기화</Button>
              {/* <button onClick={() => {
                var newarr: any = []
                setThird(newarr)
              }}>retry</button> */}






              {/* <Form.Label>학습언어 {third}</Form.Label>
    <div>
    <button onClick={()=>{
      handleThird('Korean')
    }}>Korean</button>
    <button onClick={()=>{
      handleThird('English')
    }}>English</button>
    <button onClick={()=>{
      handleThird('Japanese')
    }}>Japanese</button>
    <button onClick={()=>{
      handleThird('Chinese')
    }}>Chinese</button>
    <button onClick={()=>{
      handleThird('Spanish')
    }}>Spanish</button>
    <button onClick={()=>{
      var newarr:any = []
      setThird(newarr)
    }}>retry</button>
    </div> */}





              {/* <select onChange={onChangeHanlder} value={Content}>
		{Options.map((item, index)=>(
			<option key={item.key} value={item.key}>{item.value}</option>
		))}
    </select> */}
              <Form.Label>자기소개 {profile}</Form.Label>
              <InputGroup>
                {/* <InputGroup.Text>With textarea</InputGroup.Text> */}
                <FormControl placeholder='10자이상 입력해주세요' as="textarea"
                  aria-label="With textarea" onChange={handleProfile} />
              </InputGroup>

              <Button onClick={onSubmit}
                style={{ marginTop: '5px' }} variant="outline-dark">가입</Button>
              {/* <button type="submit" onClick={onSubmit}>
                가입
              </button> */}
              {/* <Button variant="primary" type="submit" >
                  로그인
                </Button> */}

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