/* eslint-disable */
import { Container,Row,Col,Card,Button,ListGroup } from 'react-bootstrap';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useEffect,useState } from "react";
import langarr from '../../component/user/Langarr'
import langkey from '../../component/user/Lang'
import axios from "axios";

export default function Mate(props) {
  const larr = langarr
  const lkey = langkey
  // 학습언어
  const [langa,setLangA] = useState([])
  // 구사언어
  const [langb,setLangB] = useState([])
  // 모국어
  const [langc,setLangC] = useState([])
  // 언어전부
  const [lang,setLang] = useState(props.user.langList)
  // 유저아이디
  const email = props.user.email
  // 유저 좋아요
  const [like,setLike] = useState(props.user.rating)
  // 유저 좋아요 버튼
  const [likeBtn,setLikeBtn] = useState(true)

  // const lc = langc.map((a,i)=>{
  //   return <div>
  //     {larr[a]}
  //   </div>
  // })

  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };

  const userLike = (event) => {
    event.preventDefault();
    axios({
      method:'post',
      url:`https://blahblah.community:8443/api/rate/${email}`,
      headers: setToken(),
      data: {
        'email':email
      },
    })
    .then((result)=>{
      setLikeBtn(!likeBtn)
      console.log('유저 좋아 요청성공')
    console.log(result)
 
  })
    .catch((error)=>{
      console.log('유저 좋아 요청실패')
      console.log(email)
    console.log(error)  
  })
  };

  useEffect(()=>{
    props.findMate()
    // 미쳤다리.. 함수 프롭스 ㄷ.ㄷ.. 실시간 변화
    setLang(props.user.langList)
    setLike(props.user.rating)
    console.log(like)
    // setLang(props.user.langList)
  },[likeBtn])

  useEffect(() => {
    // console.log('각유저별 언어')
    // console.log(lang)
    // console.log(Object.keys(lang).length)
    // 객체에는 길이가 없어서 이렇게 가져와야한다 체크
    // console.log('각유저별언어 반복문')/
    // console.log(lang.lenght)
    for(let i=0;i<Object.keys(lang).length;i++){
      // console.log(lang[i]['level'])
      if(lang[i]['level']===1 ||lang[i]['level']===2 || lang[i]['level']===3){
        var newarr = [...langa]
        newarr.push(lang[i]['lang_id'])
        // newarr.push(3)
        setLangA(newarr)
      }else if(lang[i]['level']===4){
        var newarr = [...langa]
        newarr.push(lang[i]['lang_id'])
        setLangB(newarr)
      }
      else if(lang[i]['level']===5){
        var newarr = [...langa]
        newarr.push(lang[i]['lang_id'])
        setLangC(newarr)
      }
    }
  }, []);

  // useEffect(()=>{
  //   console.log('------변환완료----')
  //   console.log(langa)
  //   console.log(langb)
  //   console.log(langc)
  // },[langa])
  

  return <>
  <Container>
    <Row>
      <Col sm={2} xs={2}>
    {/* {
      langa
      ?<>{langa}</>
      :<>없어</>
    }
    {
      langc
      ?<>{
        langc.map((a,i)=>{
          return <div key={i}>
            {larr[a]}
          </div>
        })
      }</>
      :<></>
    } */}
      {/* {props.user.name}
      {props.user.description}
      {props.user.gender ===1
  ?<>남자</>
  :<>여자</>
  } */}
      </Col>
      <Col>  
      <div className='matebox'>
      <div className='box'>
      <Avatar
        alt="ProfileImage"
        src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/profile/${props.user.profileImg}`}
        // src="/user/young-man.png"
        sx={{ width: 100, height: 100 }}
      />
      </div>
      <div className='box'>
      <ListItemText primary={`${props.user.name}(${props.user.age})`} secondary={props.user.gender ===0
  ?<>남자</>
  :<>여자</>
  }/>
  
        {/* <h5>{props.user.name}({props.user.age})</h5> */}
        {/* <h5>{props.user.gender ===1
  ?<>남자</>
  :<>여자</>
  }</h5> */}

      </div>
      </div>
      <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      <ListItem>
      
        <ListItemText primary="모국어" secondary={
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
        } />
        {/* {
          langc
          ?<>
          {
            langc.map((a,i)=>{
              return <div key={i}>
                <Avatar 
              alt="langImage"
              src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/language/${lkey[larr[a]]}.png`}
              sx={{ width: 25, height: 25 }}
            />
              </div>
            })
          }
          </>        
          :null
        } */}


        
      </ListItem>
      <ListItem>
        <ListItemText primary="인기도" secondary={`${like}`} />
        {/* <button onClick={userLike}>클릭</button> */}
        <Button onClick={userLike}
                  style={{ marginBottom: '20px' }} variant="outline-dark">좋아요</Button>
      </ListItem>
      


    </List>
      
      </Col>
      
      <Col>
      <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      <ListItem>
        <ListItemText primary="구사언어" secondary={
          langb
          ?<span>
          {
            langb.map((a,i)=>{
              return <span key={i}>
                {/* <Avatar 
              alt="langImage"
              src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/language/${lkey[larr[a]]}.png`}
              // src="/user/young-man.png"
              sx={{ width: 25, height: 25 }}
            /> */}
                      {larr[a]} 
                      <img style={{margin:'5px'}}
                      src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/language/${lkey[larr[a]]}.png`} width={25}></img>

              </span>
            })
          }
          </span>
          :null
        } />
      </ListItem>
      
      <ListItem>
        <ListItemText primary="학습언어" secondary={
          langa
          ?<span>
          {
            langa.map((a,i)=>{
              return <span key={i}>
                {/* <Avatar 
              alt="langImage"
              src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/language/${lkey[larr[a]]}.png`}
              // src="/user/young-man.png"
              sx={{ width: 25, height: 25 }}
            /> */}
           {larr[a]} 
                      <img style={{margin:'5px'}}
                      src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/language/${lkey[larr[a]]}.png`} width={25}></img>

              </span>
            })
          }
          </span>
          :null
        } />
      </ListItem>
      <ListItem>
        <ListItemText primary="자기소개" secondary={`${props.user.description}`} />
      </ListItem>


    </List>
</Col>
  <Col sm={2} xs={2}></Col>
    </Row>
    <hr></hr>
  </Container>






<style jsx>{`
        .matebox{
          border-radius: 15px;
          background-color:#edf7f6;
          // background-color:#e8feff;
          display: flex;
        }
        .box{
          float:left;
          margin:10px;
        }
        .tt{
          color:grey;
          font-size:6px;
          opacity:0.5;
        }
        

      `}</style>
  </>
}

