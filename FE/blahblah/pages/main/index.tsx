/* eslint-disable */
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { useEffect,useState } from "react";
import Link from "next/link";
import Mate from '../../component/main/Mate'
import { useRouter } from "next/router";

// import '../../styles/bg.css'


export default function Index(props:any) {
  const router = useRouter()


  const [mate,setMate] = useState<any>()
  const [following,setFollowing] = useState<any>()
  const [rateList,setRateList] = useState<any>()
  const [islogin, setIslogin] = useState<any>(false)


  // 팔로잉 목록, 이걸로 follow버튼 처음에 활성, 비활성화
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };
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
      // setFollowing(res.data)
    }).catch((err)=>{
      console.log('팔로잉 목록 요청실패')
      console.log(err)
    });
  };

  const getRateList = () => {
    axios({
      url: "https://blahblah.community:8443/api/rate/ratedlist",
      method: "get",
      headers: setToken(),
    }).then((res) => {
      console.log('좋아요 목록 요청성공')
      // console.log(res)
      console.log(res.data)
      setRateList(res.data)
      // setFollowing(res.data)
      // setFollowing(res.data)
    }).catch((err)=>{
      console.log('좋아요 목록 요청실패')
      console.log(err)
    });
  };

  const findMate = () => {
    // event.preventDefault();
    axios({
      method:'get',
      url:`https://blahblah.community:8443/api/user/`,
    })
    .then((result)=>{
     console.log('get요청성공')
     console.log(result)
     console.log(result.data)
     setMate(result.data)
  })
    .catch((error)=>{console.log('요청실패')
    console.log(error)  
  })
  };
  useEffect(() => {
    findMate()
    getFollowing()
    getRateList()
    props.setBg(false)
  }, []);
  useEffect(() => {
    console.log("컴포넌트 나타남");
    return () => {
      console.log("cleanUp 함수");
      props.setBg(true)
    };
  },[]);
  // 뎁스 빈배열해야 사라질때만 실행됨
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setIslogin(true)
    } else {
      router.push('/user/login')
      alert('Please login')
      
    }
  }, []);
  return (
    <>
{/* {props.test} */}
    <Container>
      <Row>
        <Col sm={2} xs={2}></Col>
        <Col>
        {
        mate
        ?<>{
          mate.map(function(a:any,i:any){
            return (
              <div  key = {i} className="matebox">
                <Mate user={a} findMate={findMate} following={following} rateList={rateList}/>
              </div>
             
              

              
            )
          })
        }
        </>
        :null
      }
        </Col>
        <Col sm={2} xs={2}></Col>
      </Row>
    </Container>

    {/* <Container >
    <Row>

      <Col>
      {
        mate
        ?<>{
          mate.map(function(a:any,i:any){
            return (
              <div className="matebox" key = {i}>
                <Mate user={a} findMate={findMate} following={following} rateList={rateList}/>
              </div>
             
              

              
            )
          })
        }
        </>
        :null
      }

                </Col>

    </Row>

  </Container> */}
  <style jsx>{`
          body {
            background:grey;
          }
        .matebox{
          // border:solid 3px grey;
          border-radius: 15px;
          background-color:white;
          // // background:grey;
          // witdh:700px;
          margin-top:30px;
          margin-bottom:30px;
          
        }

       
        

      `}</style>
    </>
  )
}