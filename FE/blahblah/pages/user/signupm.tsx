/* eslint-disable */
import { useRouter } from "next/router";
import { Form, Button, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import axios from "axios";
import { useState } from "react";
import lang2 from '../../component/user/Lang'
import langImg2 from '../../component/user/LangImg'
// import langkey from '../../component/user/Langarr'

export default function Signup() {
  const lang: any = lang2
  const langImg: any = langImg2

  const Router = useRouter();
  const { query } = useRouter();
  const [email, setEmail] = useState(query.email)
  
  // 가입절차
  const [page1,setPage1] = useState(true)
  const [page2,setPage2] = useState(false)


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
  const languages = Object.keys(lang)
  // const languages = ['Korean', 'English', 'Japanese', 'Chinese', 'Spanish'
  //   , 'a', 'b', 'c', '....']
  // 모국어
  const [first, setFirst] = useState([])
  const [firstob, setFirstob] = useState([])
  const handleFirst = (e: any) => {

    var array: any = [...first]
    var ob: any = [...firstob]

    if (array.includes(e.currentTarget.value) === false && array.length <= 1 && ob.length <= 1&&
    e.currentTarget.value!=='언어선택') {
      array.push(e.currentTarget.value)
      // let key = e.currentTarget.value
      let key = e.currentTarget.value
      ob.push({ "code": lang[key], "level": 1 })
      // console.log(lname)
      setFirstob(ob)
      setFirst(array);
      console.log(first)
      console.log(firstob)
    }
    
  };
  const handleFirstDel = (e:any) =>{
    var array:any = [...first]
    var array2:any = [...firstob]
    var idx = -1
    for(let i=0;i<array.length;i++){
      if(array[i]===e){
        idx = i
        break
      }
    }
    console.log(idx)
    array.splice(idx,1)
    array2.splice(idx,1)
    setFirst(array)
    setFirstob(array2)

  }
  // 구사언어
  const [second, setSecond] = useState([])
  const [secondob, setSecondob] = useState([])
  const handleSecond = (e: any) => {
    var array: any = [...second]
    var ob: any = [...secondob]

    if (array.includes(e.currentTarget.value) === false && array.length <= 2 && ob.length <= 2
    &&e.currentTarget.value!=='언어선택') {
      array.push(e.currentTarget.value)
      let key = e.currentTarget.value
      ob.push({ "code": lang[key], "level": 4 })
      setSecond(array);
      setSecondob(ob)
      console.log(second)
      console.log(secondob)
    }
    
  };
  const handleSecondDel = (e:any) =>{
    var array:any = [...second]
    var array2:any = [...secondob]
    var idx = -1
    for(let i=0;i<array.length;i++){
      if(array[i]===e){
        idx = i
        break
      }
    }
    console.log(idx)
    array.splice(idx,1)
    array2.splice(idx,1)
    setSecond(array)
    setSecondob(array2)
    // 이거를 안바꿔줫네

  }
  // 학습언어
  const [third, setThird] = useState([])
  const [thirdob, setThirdob] = useState([])
  const handleThird = (e: any) => {
    var array: any = [...third]
    var ob: any = [...thirdob]

    if (array.includes(e.currentTarget.value) === false && array.length <= 3 && ob.length <= 3
    &&e.currentTarget.value!=='언어선택') {
      array.push(e.currentTarget.value)
      let key = e.currentTarget.value
      ob.push({ "code": lang[key], "level": 5 })
      setThird(array);
      setThirdob(ob)
      console.log(third)
      console.log(thirdob)
    }
    
  };
  const handleThirdDel = (e:any) =>{
    var array:any = [...third]
    var array2:any = [...thirdob]
    var idx = -1
    for(let i=0;i<array.length;i++){
      if(array[i]===e){
        idx = i
        break
      }
    }
    console.log(idx)
    array.splice(idx,1)
    array2.splice(idx,1)
    setThird(array)
    setThirdob(array2)

  }
  // 성별
  const [gen, setGen] = useState<any>()
  const gens = ['남자', '여자']
  const onGenHanlder = (e: any) => {
    if (e.currentTarget.value === '남자') {
      setGen(0)
    } else {
      setGen(1)
    }
    // setGen(e.currentTarget.value)
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
  // 이미지 미리보기
  // const [files,setFiles] = useState('')
  // const onLoadFile = (e:any)=>{
  //   const file = e.target.files;
  //   console.log(file)
  //   setFiles(file)
  // }

  // 비밀번호 입력부분
  const handlePassword = (event: any) => {
    //event.preventDefault();
    setPassword(event.target.value);
  };
  const handlePwcheck = (event: any) => {
    //event.preventDefault();
    setPwcheck(event.target.value)
  }

  // 프로필 이미지
  const [file, setFilfe] = useState<any>(null)
  // 이미지 업로드 안해놓으면 기본 null처리
  // 기본 이미지 사용 누르면 null되게 처리 추가하자
  const onChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const formData = new FormData();


    if (e.target.files) {
      const uploadFile = e.target.files[0]
      formData.append('file', uploadFile)
      setFilfe(uploadFile)
      console.log(uploadFile)
      console.log('===useState===')
      console.log(file)
    }
  }



  const onSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    const newarr = [
      ...firstob,
      ...secondob,
      ...thirdob
    ]
    // let test = [{ "code": "kor", "level": 3 }, { "code": "eng", "level": 4 }, { "code": "chi", "level": 5 }]
    const info: any = {
      "email": '151515@test.com',
      "name": name,
      "gender": gen,
      "age": age,
      "description": profile,
      "password": password,
      "list":newarr,
      // "list" : [{"code":"kor", "level":'3'}, {"code":"en", "level":'4'}, {"code":"chi", "level":'5'}],
      // "list": [{ "code": "kor", "level": 3 }, { "code": "eng", "level": 4 }, { "code": "chi", "level": 5 }],
    }
    formData.append('file', file)
    formData.append('info', new Blob([JSON.stringify(info)], { type: "application/json" }))
    console.log(formData)
    axios({
      url: `https://blahblah.community:8443/api/user/signup`,
      method: "post",
      data: formData,
    })
      .then((res) => {
        console.log(res)
        console.log('가입성공')
        // console.log(formData)
        Router.push({
          pathname: "/",
        });
      })
      .catch((err) => {
        console.log(err);
        console.log('가입실패')
      });

  }





  return (
    <>
      <Container>
        <Row>
          <Col></Col>
          <Col><h1>회원가입 </h1>
            {email
            ?<>사용할 아이디는 {email} 입니다.</>
            :null
            }
            {/* 이거 이메일 빈녀석이면 예외처리 */}
            {/* const [result,setResult] = useState(false) */}
            {
              page1
              ?<div className='logdiv'>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>이름</Form.Label>
                <Form.Control className="formct" type="text" placeholder="이름을입력하세요" onChange={handleName} maxLength={20} />

              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>패스워드</Form.Label>
                <Form.Control className="formct" type="password" placeholder="6자이상 입력해주세요" onChange={handlePassword} maxLength={10} />
              </Form.Group>
              <Form.Group  className="mb-3" controlId="formBasicPassword">
                <Form.Label>패스워드확인 -
                  {
                    password === pwcheck && password.length >= 6
                      ? <> 비밀번호가 같습니다.</>
                      : <> 비밀번호가 다릅니다.</>
                  }

                </Form.Label>
                <Form.Control className="formct" type="password" placeholder="6자이상 입력해주세요" onChange={handlePwcheck} maxLength={10} />
              </Form.Group>

              <Form.Label>- 추가정보 -</Form.Label>

              {/* {gen} */}

              <Form.Select className="formct" aria-label="Default select example"
                onChange={onGenHanlder} >
                <option>성별 </option>
                {gens.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </Form.Select>

              {/* {age} */}
              <Form.Select className="formct" aria-label="Default select example"
                onChange={onAgeHanlder} >
                <option>나이 </option>
                {ages.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </Form.Select>


              <hr />
              
              

              <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>프로필 이미지를 업로드 해주세요</Form.Label>
              <Form.Control className="formct" type="file" accept="image/*" size="sm" onChange={onChangeImg}/>
            </Form.Group>

              
              <Form.Label>자기소개 {profile}</Form.Label>
              <InputGroup>
                {/* <InputGroup.Text>With textarea</InputGroup.Text> */}
                <FormControl className="formct" placeholder='10자이상 입력해주세요' as="textarea"
                  aria-label="With textarea" onChange={handleProfile} />
              </InputGroup>

              


            </div>
            :<>
            <Form.Label>모국어(2개까지)
                {
                  first
                  ?<>
                  {first.map((a,i)=>{
                    return <div key={i}>
                      <img style={{margin:'5px'}}
                    src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/language/${langImg[a]}.png`} width={25}></img>
                    {a} <span style={{fontSize:'16px',color:'grey',cursor:'pointer'}}
                    onClick={()=>{handleFirstDel(a)}}>x</span>
                    {/* splice로 제거할 수있긴함 근데 귀찮은데 그것까지 하고 끝낼까? 초기화로할까 */}
                      </div>
                  })
}</>
                  :null
                }
              
              </Form.Label>
              <Form.Select className="formct" aria-label="Default select example"
                onChange={handleFirst} >
                <option>언어선택 </option>
                {languages.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </Form.Select>

              <hr />
              <Form.Label>구사언어(3개까지)
              {
                  second
                  ?<>
                  {second.map((a,i)=>{
                    return <div key={i}>
                      <img style={{margin:'5px'}}
                    src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/language/${langImg[a]}.png`} width={25}></img>
                    {a} <span style={{fontSize:'16px',color:'grey',cursor:'pointer'}}
                    onClick={()=>{handleSecondDel(a)}}>x</span>
                    </div>
                  })
}</>
                  :null
                }
              
              </Form.Label>
              <Form.Select className="formct" aria-label="Default select example"
                onChange={handleSecond} >
                <option>언어선택 </option>
                {languages.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </Form.Select>
              <hr />
              <Form.Label>학습언어(4개까지) 
              {
                  third
                  ?<>
                  {third.map((a,i)=>{
                    return <div key={i}>
                      <img style={{margin:'5px'}}
                    src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/language/${langImg[a]}.png`} width={25}></img>
                    {a} <span style={{fontSize:'16px',color:'grey',cursor:'pointer'}}
                    onClick={()=>{handleThirdDel(a)}}>x</span>
                    </div>
                  })
}</>
                  :null
                }
                </Form.Label>
              <Form.Select className="formct" aria-label="Default select example"
                onChange={handleThird}

              >
                <option>언어선택 </option>
                {languages.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </Form.Select>
              <Button onClick={() => {
                // console.log(first)
                // console.log(firstob)
                // console.log(second)
                // console.log(secondob)
                // console.log(third)
                // console.log(thirdob)
                const newarr = [
                  ...firstob,
                  ...secondob,
                  ...thirdob
                ]
                console.log(newarr)

              }}
                style={{ marginTop: '5px' }} variant="outline-dark">언어출력</Button>
              <Button onClick={onSubmit} className="btncs" 
                   variant="outline-secondary"
                style={{ marginTop: '3px',marginRight:'5px' }} >가입</Button>
                <Button style={{marginTop:'3px'}} variant="outline-secondary" onClick={()=>{
                setPage1(!page1)
              }}>이전페이지</Button>
                
                
            </>
            }
            {
              page1
              ?<Button style={{marginTop:'5px'}} variant="outline-secondary" onClick={()=>{
                setPage1(!page1)
              }}>다음페이지</Button>
              :null
            }
            
            </Col>

            <Col>
            
            </Col>
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