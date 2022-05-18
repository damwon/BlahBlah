/* eslint-disable */
import { Container,Row,Col,ListGroup } from 'react-bootstrap';
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";


export default function Friends() {
  const router = useRouter()

  const [islogin, setIslogin] = useState(false)
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


  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
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
      <Col>
      <h1>팔로잉</h1>
      <ListGroup>
        {
          following
          ?<>{following.map((a:any,i:any)=>{
            return <><ListGroup.Item key={i}>{a.name}</ListGroup.Item></>
          })}
            </>
          :<></>
        }

</ListGroup>
      </Col>
      <Col>
      <h1>팔로워</h1>
      <ListGroup>
      {
          follower
          ?<>{follower.map((a:any,i:any)=>{
            return <><ListGroup.Item key={i}>{a.name}</ListGroup.Item></>
          })}
            </>
          :<></>
        }
</ListGroup>
      </Col>

        </Row>
  
    </Container>
      
    </>
  )
}