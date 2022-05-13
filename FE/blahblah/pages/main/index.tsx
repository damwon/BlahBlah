/* eslint-disable */
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { useEffect,useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import Mate from '../../component/main/Mate'


export default function Index() {

  const [mate,setMate] = useState<any>()
  const [following,setFollowing] = useState<any>()
  const [rateList,setRateList] = useState<any>()

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
  }, []);
  return (
    <>
    <Container>
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
            // <>
            // <Mate user={a} key={i}/>
            // </>
            // 프래그먼트에는 key가안먹는다
          })
        }
        {/* {mate[0].email} */}
        </>
        :null
      }
      {/* <button type="submit" onClick={findMate}>
                  메이트찾기
                </button> */}
                </Col>
    </Row>
    <Row>
      <Col>
      {/* <Mate user={mate}></Mate> */}
      </Col>
    </Row>
  </Container>
  <style jsx>{`
        .matebox{
          // border-radius: 15px;
          // background-color:white;
          
        }
       
        

      `}</style>
    </>
  )
}