/* eslint-disable */
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import lang2 from '../../component/user/Lang'
import langImg2 from '../../component/user/LangImg'


export default function LangUpdate() {
  const lang: any = lang2
  const langImg: any = langImg2
  const router = useRouter()
    // 본인 정보 저장
    const [profile, setProfile] = useState<any>([]);
    // 본인 정보
    const getProfile = () => {
      axios({
        url: `https://blahblah.community:8443/api/user/me`,
        method: "get",
        headers: setToken(),
      }).then((res) => {
        console.log(res)
        setProfile(res.data);
        console.log(res.data)
        console.log(res.data.langInfos)
      });
    };
  
    const setToken = () => {
      const token = localStorage.getItem("jwt");
      const config = {
        Authorization: `Bearer ${token}`,
      };
      return config;
    };
  
    useEffect(() => {
      getProfile();
    }, []);

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


  const onEdit = (event: any) => {

    event.preventDefault();
    const formData = new FormData();

    const newarr:any = [
      ...firstob,
      ...secondob,
      ...thirdob
    ]

    console.log(newarr)
    var test:any = [{"code":"kor", "level":'3'}, {"code":"en", "level":'4'}, {"code":"chi", "level":'5'}]
    console.log('test--------')
    console.log(test)
    formData.append('langList', new Blob([JSON.stringify(newarr)], { type: "application/json" }))
    // formData.append('langList', test)
    
    axios({
      url: `https://blahblah.community:8443/api/user/edit-lang`,
      method: "put",
      headers: setToken(),
      data: formData
      // {'langList':test,
      //   // "langList": newarr,
      //   // "langList" : [{"code":"kor", "level":'3'}, {"code":"en", "level":'4'}, {"code":"chi", "level":'5'}],

      // },
    })
      .then((res) => {
        console.log(res)
        console.log('잘수정됫엉')
        // router.push('/user/mypage')
      })
      .catch((err) => {
        console.log(err);
        console.log('수정실패했엉')
      });
  };

  return (
    <>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <h1>언어수정</h1>
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
                <Button onClick={onEdit} className="btncs" 
                   variant="outline-secondary"
                style={{ marginTop: '3px',marginRight:'5px' }} >수정하기</Button>
                <Button onClick={() => {
              router.push('/user/mypage')
            }}
              style={{ margin: '2px' }} variant="outline-secondary">마이페이지 돌아가기</Button>
          </Col>
          <Col></Col>
        </Row>

      </Container>
    </>
  )
}