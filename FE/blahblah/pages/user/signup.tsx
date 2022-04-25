import UserNav from '../../component/user/userNav'
import { useRouter } from "next/router";
import { Form, Button, Container, Row, Col,InputGroup,FormControl } from 'react-bootstrap';
import axios from "axios";
import { useState } from "react";

export default function Signup() {
  const Router = useRouter();

  // 가입결과 테스트
  // 이메일은 1)이메일이맞는지, 2)이메일이 맞으면 중복체크까지
  const [result,setResult] = useState(false)
  // 이메일
  const [inputEmail, setInputEmail] = useState("");
  // 이메일 중복체크
  const [isEmailOnly, setIsEmailOnly] = useState(false);

  // 비밀번호
  const [password, setPassword] = useState("")
  const [pwcheck,setPwcheck] = useState("")
  const [pwsame,setPwsame] = useState(false)

  // 이메일 입력부분
  const handleEmail = (event: any) => {
    event.preventDefault();
    setInputEmail(event.target.value);
  };
  // 주사용언어
  const [first,setFirst] = useState("")
  const firsts =[
    {key:1, value:"한국어"},
      {key:2, value:"영어"},
      {key:3, value:"일본어"},
      {key:4, value:"중국어"},
      {key:5, value:"스페인어"},
  ]
  const onFirstHanlder=(e:any)=>{
    setFirst(e.currentTarget.value)
  }
  // 배우고싶은언어
  const [second,setSecond] = useState("")
  const seconds =[
    {key:1, value:"한국어"},
      {key:2, value:"영어"},
      {key:3, value:"일본어"},
      {key:4, value:"중국어"},
      {key:5, value:"스페인어"},
  ]
  const onSecondHanlder=(e:any)=>{
    setSecond(e.currentTarget.value)
  }
  // 성별
  const [gen,setGen] = useState("")
  const gens =[
    {key:1, value:"남자"},
      {key:2, value:"여자"},

  ]
  const onGenHanlder=(e:any)=>{
    setGen(e.currentTarget.value)
  }
  // 나이
  const [age,setAge] = useState("")
  // const [Content, setContent] = useState();
  const onAgeHanlder=(e:any)=>{
    setAge(e.currentTarget.value)
  }
  const ages =[
    {key:1, value:"10대"},
      {key:2, value:"20대"},
      {key:3, value:"30대"},
      {key:4, value:"40대"},
      {key:5, value:"50대"},
  ]

  // 프로필
  const [profile,setProfile] = useState("")
  const handleProfile = (e:any)=>{
    setProfile(e.currentTarget.value)
  }




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
  


  const onSubmit = (event:any)=>{

// 이메일은 1)이메일이맞는지, 2)이메일이 맞으면 중복체크까지

    // alert('hihi')
    // 1.이메일중복체크 위에서완료, true체크
    // 2.비밀번호 같은지체크
    // 3.추가정보 빈칸 아닌지체크
    // 4.자기소개 빈칸 아닌지체크
    // 5.제출
    // if(isEmailOnly===true){
    //   alert('이메일오케이')
    // }
    // first,second,gen,age,profile

    // 이메일은 1)이메일이맞는지, 2)이메일이 맞으면 중복체크까지
    if(password.length>=6&&password===pwcheck && first.length!==0 &&second.length!==0
      &&gen.length!==0&&age.length!==0&&profile.length!==0){
      alert('가입완료')
    }else{
      alert('빈칸이있음')
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
          {/* const [result,setResult] = useState(false) */}
         
            이메일
            {inputEmail}
            비번
            {password}
            비번체크
            {pwcheck}
            추가정보
            {first}
            {second}
            {gen}
            {age}
            {profile}
            <div className='logdiv'>
              {/* <Form></Form> */}
              {/* 이놈 제거! */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>이메일주소</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" onChange={handleEmail} />
                  <button  onClick={onClickEmailCheck}>
                  이메일 중복체크
                </button>
                  {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text> */}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>패스워드</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={handlePassword} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>패스워드확인-
                  {
              password===pwcheck && password.length >=6
              ?<>비밀번호가 같습니다.</>
              :<>비밀번호가 다릅니다.</>
            }

                  </Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={handlePwcheck} />
                </Form.Group>
                
                <Form.Label>추가정보</Form.Label>
                {/* <select onChange={onFirstHanlder} value={first}>
		{firsts.map((item, index)=>(
			<option key={item.key} value={item.key}>{item.value}</option>
		))}
    </select> */}
  <Form.Select aria-label="Default select example"
  onChange={onFirstHanlder} value={first}>
  <option>주사용언어</option>
  {firsts.map((item, index)=>(
			<option key={item.key} value={item.key}>{item.value}</option>
		))}
</Form.Select>
<Form.Select aria-label="Default select example"
onChange={onSecondHanlder} value={second}>
  <option>배우고싶은언어</option>
  {seconds.map((item, index)=>(
			<option key={item.key} value={item.key}>{item.value}</option>
		))}
</Form.Select>
<Form.Select aria-label="Default select example"
onChange={onGenHanlder} value={gen}>
  <option>성별</option>
  {gens.map((item, index)=>(
			<option key={item.key} value={item.key}>{item.value}</option>
		))}
</Form.Select>
<Form.Select aria-label="Default select example" 
onChange={onAgeHanlder} value={age}>
  <option>나이</option>
  {ages.map((item, index)=>(
			<option key={item.key} value={item.key}>{item.value}</option>
		))}
</Form.Select>
{/* <select onChange={onChangeHanlder} value={Content}>
		{Options.map((item, index)=>(
			<option key={item.key} value={item.key}>{item.value}</option>
		))}
    </select> */}
<Form.Label>자기소개</Form.Label>
<InputGroup>
    {/* <InputGroup.Text>With textarea</InputGroup.Text> */}
    <FormControl as="textarea" aria-label="With textarea" onChange={handleProfile}/>
  </InputGroup>

                
                <button type="submit" onClick={onSubmit}>
                  가입
                </button>
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