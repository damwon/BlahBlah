import { Container,Row,Col } from 'react-bootstrap';
import { useEffect,useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router'

export default function User() {
  const router = useRouter()
  const [isLogin,setIslogin] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log('로그인후 메인페이지에서 jwt읽기')
    // console.log(localStorage.getItem("jwt"))
    if (token) {
      setIslogin(true)
    }
  }, []);

  const onLogout = (event:any) => {
    event.preventDefault();
    setIslogin(false);
    localStorage.removeItem("jwt");
    // console.log(localStorage.getItem("key"))
    router.push("/user/login")
  };

  return (
    <>
      
      {
    isLogin===true
    ?<>로그인성공</>
    :<>비로그인상태</>
  }
  {/* {
    isLogin===true
    ?<><button onClick={onLogout}>로그아웃</button></>
    :<><button onClick={()=>{
      router.push("/user/login")
    }}>로그인하기</button></>
  } */}
    </>
  )
}