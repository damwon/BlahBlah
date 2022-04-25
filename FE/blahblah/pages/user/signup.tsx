/* eslint-disable */
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
  // 이메일 중복체크후 이메일 인증버튼 나오게
  const [EmailCheck,setEmailCheck] = useState(false)
  // 그리고 이메일창 onchange

  // 비밀번호
  const [password, setPassword] = useState("")
  const [pwcheck,setPwcheck] = useState("")
  const [pwsame,setPwsame] = useState(false)

  // 이메일 입력부분
  const handleEmail = (event: any) => {
    event.preventDefault();
    setInputEmail(event.target.value);
  };
  // 모국어
  const [first,setFirst] = useState([])
  const handleFirst = (input: any) => {
    var array:any = [...first]
    // console.log(array.includes(input))
    if (array.includes(input)===false && array.length <=1){
      array.push(input)
    }
    
    setFirst(array);
  };
  // 구사언어
  const [second,setSecond] = useState([])
  const handleSecond = (input: any) => {
    var array:any = [...second]
    if (array.includes(input)===false && array.length <=2){
      array.push(input)
    }
    
    setSecond(array);
  };
  // 학습언어
  const [third,setThird] = useState([])
  const handleThird = (input: any) => {
    var array:any = [...third]
    if (array.includes(input)===false && array.length <=3){
      array.push(input)
    }
    
    setThird(array);
  };
  // 성별
  const [gen,setGen] = useState("")
  const gens =['남자','여자'
    // {key:1, value:"남자"},
    //   {key:2, value:"여자"},

  ]
  const onGenHanlder=(e:any)=>{
    setGen(e.currentTarget.value)
  }
  // 나이
  const [age,setAge] = useState(0)
  const ages = []
  for(var i=0;i<101;i++){
    ages.push(i)
  }
  const onAgeHanlder=(e:any)=>{
    setAge(e.currentTarget.value)
  }
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

//
//
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
    // 여기 체크나 더하기~!
    if(password.length>=6&&password===pwcheck 
      && first.length!==0 &&second.length!==0
      &&gen.length!==0&&age==0&&profile.length!==0){
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
         
            
            
            
            <div className='logdiv'>
              {/* <Form></Form> */}
              {/* 이놈 제거! */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>이메일주소 {inputEmail}</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" onChange={handleEmail} />
                  <button  onClick={onClickEmailCheck}>
                  이메일 중복체크
                </button>
                  
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>패스워드 {password}</Form.Label>
                  <Form.Control type="password" placeholder="6자이상 입력해주세요" onChange={handlePassword} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>패스워드확인 {pwcheck}-
                  {
              password===pwcheck && password.length >=6
              ?<>비밀번호가 같습니다.</>
              :<>비밀번호가 다릅니다.</>
            }

                  </Form.Label>
                  <Form.Control type="password" placeholder="6자이상 입력해주세요" onChange={handlePwcheck} />
                </Form.Group>
                
                <Form.Label>- 추가정보 -</Form.Label> 
                {gen}
<Form.Select aria-label="Default select example"
onChange={onGenHanlder} value={gen}>
  <option>성별 </option>
  {gens.map((item, index)=>(
			<option key={index} value={item}>{item}</option>
		))}
</Form.Select>
{age}
<Form.Select aria-label="Default select example"
onChange={onAgeHanlder} value={gen}>
  <option>나이 </option>
  {ages.map((item, index)=>(
			<option key={index} value={item}>{item}</option>
		))}
</Form.Select>




<Form.Label>모국어 {first} </Form.Label>
    <div>
    {/* <button onClick={()=>{
      var newArray:any = [...first]
      newArray.push('Korean')
      setFirst(newArray)
    }}>Korean</button> */}
    <button onClick={()=>{
      handleFirst('Korean')
    }}>Korean</button>
    <button onClick={()=>{
      handleFirst('English')
    }}>English</button>
    <button onClick={()=>{
      handleFirst('Japanese')
    }}>Japanese</button>
    <button onClick={()=>{
      handleFirst('Chinese')
    }}>Chinese</button>
    <button onClick={()=>{
      handleFirst('Spanish')
    }}>Spanish</button>
    <button onClick={()=>{
      var newarr:any = []
      setFirst(newarr)
    }}>retry</button>
    </div>
    <Form.Label>구사언어 {second}</Form.Label>
    <div>
    <button onClick={()=>{
      handleSecond('Korean')
    }}>Korean</button>
    <button onClick={()=>{
      handleSecond('English')
    }}>English</button>
    <button onClick={()=>{
      handleSecond('Japanese')
    }}>Japanese</button>
    <button onClick={()=>{
      handleSecond('Chinese')
    }}>Chinese</button>
    <button onClick={()=>{
      handleSecond('Spanish')
    }}>Spanish</button>
    <button onClick={()=>{
      var newarr:any = []
      setSecond(newarr)
    }}>retry</button>
    </div>
    <Form.Label>학습언어 {third}</Form.Label>
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
    </div>


      
   
  
{/* <select onChange={onChangeHanlder} value={Content}>
		{Options.map((item, index)=>(
			<option key={item.key} value={item.key}>{item.value}</option>
		))}
    </select> */}
<Form.Label>자기소개 {profile}</Form.Label>
<InputGroup>
    {/* <InputGroup.Text>With textarea</InputGroup.Text> */}
    <FormControl placeholder='10자이상 입력해주세요' as="textarea" aria-label="With textarea" onChange={handleProfile}/>
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