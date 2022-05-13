/* eslint-disable */
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import lang2 from '../../component/user/Lang'
import langImg2 from '../../component/user/LangImg'
import LangId from '../../component/user/Langarr'



export default function LangUpdate() {
  const lang: any = lang2
  const langImg: any = langImg2
  const langId:any = LangId
  const router = useRouter()
    // 본인 정보 저장
    const [profile, setProfile] = useState<any>([]);
    // 본인의 모든 언어정보
    const [myLang,setMyLang] = useState<any>()
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
        setMyLang(res.data.langInfos)
        // for(let i=0;i<res.data.langInfos;i++){
        //   if(res.data.langInfos[i].level===1||res.data.langInfos[i].level===2||res.data.langInfos[i].level===3){
        //     var array: any = [...first]
        //     var ob: any = [...firstob]
        //     ob.push({ "code": lang[res.data.langId], "level": 1 })
        //     array.push(langId[res.data.langId-1])
        //     setFirst(array)
        //     setFirstob(ob)
        //   }
        //   // setFirst
        // }
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
    useEffect(()=>{
      console.log('useEffectmyLang')
      console.log(myLang)
      console.log(Object(myLang))
      var array: any = [...first]
      var ob: any = [...firstob]
      var array2: any = [...second]
      var ob2: any = [...secondob]
      var array3: any = [...third]
      var ob3: any = [...thirdob]
      for(let i=0;i<Object(myLang).length;i++){
        console.log(myLang[i])

        if(myLang[i].level===1||myLang[i].level===2||myLang[i].level===3){
          console.log('----코드용-0---')
          // console.log(lang[langId[myLang[i].langId-1]])
          console.log('----코드용-0---')
          ob.push({ "code": lang[langId[myLang[i].langId-1]], "level": myLang[i].level })
          console.log(langId[myLang[i].langId-1])
          array.push(langId[myLang[i].langId-1])
          setFirst(array)
          setFirstob(ob)
        }
        else if(myLang[i].level===4){
          ob2.push({ "code": lang[langId[myLang[i].langId-1]], "level": 4 })
          array2.push(langId[myLang[i].langId-1])
          setSecond(array2)
          setSecondob(ob2)
        }else if(myLang[i].level===5){
          ob3.push({ "code": lang[langId[myLang[i].langId-1]], "level": 5 })
          array3.push(langId[myLang[i].langId-1])
          setThird(array3)
          setThirdob(ob3)
        }
        
      }
    }
    ,[myLang])


    // 언어종류
  const languages = Object.keys(lang)
  // const languages = ['Korean', 'English', 'Japanese', 'Chinese', 'Spanish'
  //   , 'a', 'b', 'c', '....']
  // 학습언어... (원래는모국어)
  const [first, setFirst] = useState<any>([])
  const [firstob, setFirstob] = useState<any>([])
  // useEffect(()=>{
  //   console.log('----------first')
  //   console.log(first)
  // },[first])
  const handleFirst = (e: any) => {

    var array: any = [...first]
    var ob: any = [...firstob]

    if (array.includes(e.currentTarget.value) === false && array.length <= 3 && ob.length <= 3&&
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
  // 모국어...(원래는 한ㄱ습언어)
  // 이것만 수정해서 ㅇㅇ 바꾸면될거같은데 레벨을..?
  const [third, setThird] = useState([])
  const [thirdob, setThirdob] = useState([])
  const handleThird = (e: any) => {
    var array: any = [...third]
    var ob: any = [...thirdob]

    if (array.includes(e.currentTarget.value) === false && array.length <= 1 && ob.length <= 1
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
    // var test:any = [{"code":"kor", "level":'3'}, {"code":"en", "level":'4'}, {"code":"chi", "level":'5'}]
    // console.log('test--------')
    // console.log(test)
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
        router.push('/user/mypage')
        // router.push('/user/mypage')/
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
                  third
                  ?<>
                  {third.map((a,i)=>{
                    return <div key={i}>
                      <img style={{margin:'5px'}}
                    src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/language/${langImg[a]}.png`} width={25}></img>
                    {a} <span style={{fontSize:'16px',color:'grey',cursor:'pointer'}}
                    onClick={()=>{handleThirdDel(a)}}
                    >x</span>
                    {/* splice로 제거할 수있긴함 근데 귀찮은데 그것까지 하고 끝낼까? 초기화로할까 */}
                      </div>
                  })
}</>
                  :null
                }
              
              </Form.Label>
              <Form.Select className="formct" aria-label="Default select example"
                onChange={handleThird} >
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
                  first
                  ?<>
                  {first.map((a:any,i:any)=>{
                    return <div key={i}>
                      <img style={{margin:'5px'}}
                    src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/language/${langImg[a]}.png`} width={25}></img>
                    {a} <span style={{fontSize:'16px',color:'grey',cursor:'pointer'}}
                    onClick={()=>{handleFirstDel(a)}}>x</span>
                    <span>{' '}Level - {firstob[i].level}</span>
                    
                    {/* <span style={{cursor:'pointer'}} onClick={()=>{
                      console.log(firstob)
                      var newarr:any = [...firstob]

                      for(let i=0;i<Object(newarr).length;i++){
                        console.log(newarr[i].code)
                        if(newarr[i].code===lang[a]){
                          newarr[i].level = 3
                        }
                        setFirstob(newarr)
                        // console.log(lang[a])
                      }
                      console.log(newarr)
                    }}>{`,lv3`}</span> */}
                    

                    <Button style={{display:'none'}}></Button>
                    {/* 더미용 버튼.. 뭐지 대체 왜 클릭되는거지 맨앞에거 */}
                      <Button style={{margin:'3px'}} onClick={()=>{
                      console.log(firstob)
                      var newarr:any = [...firstob]

                      for(let i=0;i<Object(newarr).length;i++){
                        console.log(newarr[i].code)
                        if(newarr[i].code===lang[a]){
                          newarr[i].level = 1
                        }
                        setFirstob(newarr)
                        // console.log(lang[a])
                      }
                      console.log(newarr)
                    }} variant="outline-secondary" size="sm">
      LV1
    </Button>
    <Button style={{margin:'3px'}} onClick={()=>{
                      console.log(firstob)
                      var newarr:any = [...firstob]

                      for(let i=0;i<Object(newarr).length;i++){
                        console.log(newarr[i].code)
                        if(newarr[i].code===lang[a]){
                          newarr[i].level = 2
                        }
                        setFirstob(newarr)
                        // console.log(lang[a])
                      }
                      console.log(newarr)
                    }} variant="outline-secondary" size="sm">
      LV2
    </Button>
                    <Button style={{margin:'3px'}} onClick={()=>{
                      console.log(firstob)
                      var newarr:any = [...firstob]

                      for(let i=0;i<Object(newarr).length;i++){
                        console.log(newarr[i].code)
                        if(newarr[i].code===lang[a]){
                          newarr[i].level = 3
                        }
                        setFirstob(newarr)
                        // console.log(lang[a])
                      }
                      console.log(newarr)
                    }} variant="outline-secondary" size="sm">
      LV3
    </Button>
                   
                    </div>
                  })
}</>
                  :null
                }
                </Form.Label>
              <Form.Select className="formct" aria-label="Default select example"
                onChange={handleFirst}

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
                style={{ margin: '5px' }} >수정하기</Button>
                <Button onClick={() => {
              router.push('/user/mypage')
            }}
            style={{ margin: '5px' }} variant="outline-secondary">마이페이지 돌아가기</Button>
          </Col>
          <Col></Col>
        </Row>

      </Container>
    </>
  )
}