/* eslint-disable */
import { Container, Row, Col, ListGroup, Figure, Card, Button } from 'react-bootstrap';
import axios from "axios";
import { useEffect,useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import { Email } from '@mui/icons-material';
import langarr from '../../../component/user/Langarr'
import langkey from '../../../component/user/Lang'

export default function UserDetail() {
  const router = useRouter();
  const {email} = router.query
  const [user,setUser] = useState<any>()
  const [lang,setLang] = useState<any>([])

  // 기억하자..배열 사용할때 any!
  const larr:any = langarr
  const lkey:any = langkey
  // 학습언어
  const [langa,setLangA] = useState([])
  // 구사언어
  const [langb,setLangB] = useState([])
  // 모국어
  const [langc,setLangC] = useState([])
  

  const onEmailCheck = () => {
    axios({
      method:'get',
      url:`https://blahblah.community:8443/api/user/${email}`,
    })
    .then((result)=>{
     console.log('이메일로정보 요청성공')
     console.log(result.data)
     setUser(result.data)
     setLang(result.data['langInfos'])
     console.log(result.data['langInfos'])
  })
    .catch((error)=>{
      console.log('이메일로정보 요청실패')
    console.log(error)  
  })
  };

  // 페이지 넘어오자마자 이메일 인증체크!
  useEffect(() => {
    onEmailCheck()
  }, []);
  useEffect(()=>{
    if(lang.length!==0){
      console.log('됫다!')
      for(let i=0;i<Object.keys(lang).length;i++){
        // console.log(lang[i]['level'])
        // console.log(lang[i])
        // console.log(lang[i]['langId'])
        if(lang[i]['level']===1 ||lang[i]['level']===2 || lang[i]['level']===3){
          var newarr:any = [...langa]
          // newarr.push(lang[i]['lang_id'])
          newarr.push(lang[i]['langId'])
          // newarr.push(3)
          setLangA(newarr)
        }else if(lang[i]['level']===4){
          var newarr:any  = [...langb]
          newarr.push(lang[i]['langId'])
          setLangB(newarr)
        }
        else if(lang[i]['level']===5){
          var newarr:any  = [...langc]
          // any형식의 인수는never형식에 할당할 수없음, 배열도any로 설정
          newarr.push(lang[i]['langId'])
          setLangC(newarr)
        }
      }
    }
  },[lang])





  return (
    <>
      <Container>
        <Row>
          <Col></Col>
          <Col>
          {
            user
            ?<> <ListGroup variant="flush">
            <ListGroup.Item>이름:{user.name}</ListGroup.Item>
            <ListGroup.Item>이메일주소:{user.email}</ListGroup.Item>
            <ListGroup.Item>모국어:{
          langc
          ?<>
          {
            langc.map((a,i)=>{
              return <span key={i}>
                  {larr[a]}
                  <img src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/language/${lkey[larr[a]]}.png`} width={25}
                  style={{margin:'5px'}}></img>
              </span>
            })
          }
          </>        
          :null
        }</ListGroup.Item>
            <ListGroup.Item>구사언어:{
          langb
          ?<span>
          {
            langb.map((a,i)=>{
              return <span key={i}>
                
                      {larr[a]} 
                      <img style={{margin:'5px'}}
                      src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/language/${lkey[larr[a]]}.png`} width={25}></img>

              </span>
            })
          }
          </span>
          :null
        }</ListGroup.Item>
            <ListGroup.Item>학습언어:{
          langa
          ?<span>
          {
            langa.map((a,i)=>{
              return <span key={i}>
                
           {larr[a]} 
                      <img style={{margin:'5px'}}
                      src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/language/${lkey[larr[a]]}.png`} width={25}></img>

              </span>
            })
          }
          </span>
          :null
        }</ListGroup.Item>
            <ListGroup.Item>성별:{user.gender === 1
              ? <>여자</>
              : <>남자</>
            }</ListGroup.Item>
            <ListGroup.Item>나이:{user.age}</ListGroup.Item>
            <ListGroup.Item>자기소개:{user.description}</ListGroup.Item>
          </ListGroup>
            </>
            :null
          }
         
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