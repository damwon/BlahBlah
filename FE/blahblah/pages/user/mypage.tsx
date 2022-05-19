/* eslint-disable */
import { Container, Row, Col, ListGroup, Card, Button,Badge } from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Token } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import langarr from '../../component/user/Langarr'
import langkey from '../../component/user/Lang'
import langIMG from '../../component/user/LangImg'
import Swal from "sweetalert2";



export default function Mypage() {
  const [lang,setLang] = useState<any>([])

  const larr:any = langarr
  const lkey:any = langkey
  const lImg:any = langIMG
  // 학습언어
  const [langa,setLangA] = useState([])
  const [langLv,setLangLv] = useState<any>([])
  // 구사언어
  const [langb,setLangB] = useState([])
  // 모국어
  const [langc,setLangC] = useState([])

  const [islogin, setIslogin] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setIslogin(true)
    } else {
      // alert('로그인상태가아냐!')
      Swal.fire({
        title: "Please Login",
        confirmButtonColor: "#00ccb1",
      });
      router.push('/')
    }
  }, []);
  const router = useRouter()
  const [profile, setProfile] = useState<any>([]);
  // 타입스크립트 설정.. ㅠㅡㅠ
  const getProfile = () => {
    axios({
      url: "https://blahblah.community:8443/api/user/me",
      method: "get",
      headers: setToken(),
    }).then((res) => {
      console.log(res)
      setProfile(res.data);
      setLang(res.data['langInfos'])
      // console.log(res.body)
      console.log(res.data)
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
    if (islogin) {
      getProfile();
    }
  }, [islogin]);

  useEffect(()=>{
    if(lang.length!==0){
      console.log('됫다!')
      // var newarr:any = [...langa]
      var newarra:any = [...langa]
      var newarrb:any  = [...langb]
      var newarrc:any  = [...langc]
      var arrLv:any = []



      for(let i=0;i<Object.keys(lang).length;i++){
        // console.log(lang[i]['langId'])
        if(lang[i]['level']===1 ||lang[i]['level']===2 || lang[i]['level']===3){
          // var newarr:any = [...langa]
          newarra.push(lang[i]['langId'])
          arrLv.push(lang[i]['level'])
          setLangA(newarra)
        }else if(lang[i]['level']===4){
          newarrb.push(lang[i]['langId'])
          setLangB(newarrb)
        }
        else if(lang[i]['level']===5){
          // any형식의 인수는never형식에 할당할 수없음, 배열도any로 설정
          newarrc.push(lang[i]['langId'])
          setLangC(newarrc)
        }
      }
    }
    setLangLv(arrLv)
  },[lang])

  // 팔로잉
  const [following,setFollowing] = useState<any>()
  // 팔로워
  const [follower,setFollower] = useState<any>()

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setIslogin(true)
    } else {
      // alert('로그인상태가아냐!')
      Swal.fire({
        title: "Please Login",
        confirmButtonColor: "#00ccb1",
      });
      router.push('/')
    }
  }, []);
  // 팔로잉가져오기
  const getFollowing = () => {
    axios({
      url: "https://blahblah.community:8443/api/follow/following",
      method: "get",
      headers: setToken(),
    }).then((res) => {
      console.log('팔로잉 목록 요청성공')
      // console.log(res)
      console.log(res.data)
      setFollowing(res.data)
    }).catch((err)=>{
      console.log('팔로잉 목록 요청실패')
      console.log(err)
    });
  };
  // 팔로워가져오기
  const getFollower = () => {
    axios({
      url: "https://blahblah.community:8443/api/follow/follower",
      method: "get",
      headers: setToken(),
    }).then((res) => {
      console.log('팔로워 목록 요청성공')
      console.log(res.data)
      setFollower(res.data)
    }).catch((err)=>{
      console.log('팔로워 목록 요청실패')
      console.log(err)
    });
  };

  useEffect(() => {
    if (islogin) {
      getFollowing();
      getFollower();
    }
  }, [islogin]);

  return (
    <>

      <Container>
        <Row>
        <Col sm={2} sx={2}></Col>
          <Col sm={6} sx={6}>
            <div className="mypage">
            <Avatar
        alt="ProfileImage"
        src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/profile/${profile.profileImg}`}
        // src="/user/young-man.png"
        sx={{ width: 100, height: 100 }}
      />
              {/* <Figure>
                <Figure.Image
                  width={171}
                  height={180}
                  src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/profile/${profile.profileImg}`}
                />
              </Figure> */}
            </div>
            <ListGroup variant="flush">
              <ListGroup.Item><div className="fw-bold">Name</div>{profile.name}</ListGroup.Item>
              <ListGroup.Item><div className="fw-bold">Email</div>{profile.email}</ListGroup.Item>
              <ListGroup.Item><div className="fw-bold">Native Language</div>{
          langc
          ?<>
          {
            langc.map((a,i)=>{
              return <span key={i}>
                  {larr[a-1]}
                  <img src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/language/${lImg[larr[a-1]]}.png`} width={25}
                  style={{margin:'5px'}}></img>
                  <br></br>
              </span>
            })
          }
          </>        
          :null
        }</ListGroup.Item>
              <ListGroup.Item><div className="fw-bold">Second Language</div>{
          langb
          ?<span>
          {
            langb.map((a,i)=>{
              return <span key={i}>
                
                      {larr[a-1]} 
                      <img style={{margin:'5px'}}
                      src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/language/${lImg[larr[a-1]]}.png`} width={25}></img>
<br></br>
              </span>
            })
          }
          </span>
          :null
        }</ListGroup.Item>
              <ListGroup.Item><div className="fw-bold">Study Language</div>{
          langa
          ?<span>
          {
            langa.map((a,i)=>{
              return <span key={i}>
                
           {larr[a-1]} 
                      <img style={{margin:'5px'}}
                      src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/language/${lImg[larr[a-1]]}.png`} width={25}></img>
             <Badge bg="secondary" style={{margin:'5px'}}>{langLv[i]}</Badge>
             <br></br>

              </span>
            })
          }
          </span>
          :null
        }</ListGroup.Item>
              <ListGroup.Item><div className="fw-bold">Gender</div>{profile.gender === 1
                ? <>Female</>
                : <>Male</>
              }</ListGroup.Item>
              <ListGroup.Item><div className="fw-bold">Age</div>{profile.age}</ListGroup.Item>
              <ListGroup.Item><div className="fw-bold">Rating</div>{profile.rating}</ListGroup.Item>
              <ListGroup.Item><div className="fw-bold">Description</div>{profile.description}</ListGroup.Item>
              <Button onClick={() => {
                router.push('/user/langupdate')
              }} style={{margin:'5px'}}
              className="btncs" variant="outline-secondary">Language Edit</Button>
              <Button onClick={() => {
                router.push('/user/profileupdate')
              }} style={{margin:'5px'}}
              className="btncs" variant="outline-secondary">Profile Edit</Button>
              <Button onClick={() => {
                router.push('/user/passupdate') 
              }} style={{margin:'5px'}}
              className="btncs" variant="outline-secondary">Password Edit</Button>
            </ListGroup>
          </Col>
          <Col sm={3} sx={3}>
          <Card style={{ width: '16rem', margin: '20px' }}>
              <Card.Body>
                <Card.Title>Following</Card.Title>
                <ListGroup variant="flush">
                {
          following
          ?<>{following.map((a:any,i:any)=>{
            return <ListGroup.Item key={i} >
              <a className="linkmenu" onClick={()=>{
              router.push(
                {
                  pathname: `/user/detail/`,
                  query: {
                    email:a.email,
                    userId: a.id
                  },
                },
                `/user/detail/`
                )
            }}>{'-'}{a.name}</a>
              
              </ListGroup.Item>
            
          })}
            </>
          :<></>
        }
                </ListGroup>
                {/* <a className="linkmenu" onClick={() => {
                  router.push('/user/friends')
                }}>팔로잉, 팔로워</a> */}
              </Card.Body>
            </Card>
            <Card style={{ width: '16rem', margin: '20px' }}>
              <Card.Body>
                <Card.Title>Follower</Card.Title>
                <ListGroup variant="flush">
                {
          follower
          ?<>{follower.map((a:any,i:any)=>{
            return <ListGroup.Item key={i} >
            <a className="linkmenu" onClick={()=>{
            router.push(
              {
                pathname: `/user/detail/`,
                query: {
                  email:a.email,
                  userId: a.id
                },
              },
              `/user/detail/`
              )
          }}>{'-'}{a.name}</a>
            
            </ListGroup.Item>
          })}
            </>
          :<></>
        }
                </ListGroup>
                {/* <a className="linkmenu" onClick={() => {
                  router.push('/user/friends')
                }}>팔로잉, 팔로워</a> */}
              </Card.Body>
            </Card>
            
          </Col>
          <Col sm={2} sx={2}>

            
          </Col>
        </Row>

      </Container>
      <style jsx>{`
        
        .mypage {
          display: flex;
  align-items: center;
  justify-content: center;
        }
        
          .linkmenu {
            color: black;
            text-decoration-line: none;
            display: inline;
            align-items:center;
            // font-weight:bold;
            font-size: 14px;
            margin-bottom:0;
            cursor: pointer;
          }
          .linkmenu:hover{
            color:#00ccb1;
          }

      `}</style>
    </>
  )
}