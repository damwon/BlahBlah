import { Container,Row,Col } from 'react-bootstrap';
import { useEffect,useState } from "react";
import axios from "axios";
export default function User() {
  const [test,setTest] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log('로그인후 메인페이지에서 jwt읽기')
    console.log(localStorage.getItem("jwt"))
    if (token) {
      setTest(true)
    }
  }, []);

  const onLogout = (event:any) => {
    event.preventDefault();
    setTest(false);
    localStorage.removeItem("jwt");
    console.log(localStorage.getItem("key"))
    // history.push("/login");
  };

  return (
    <>
      
      {
    test===true
    ?<>로그인상태</>
    :<>비로그인상태</>
  }
  <button onClick={onLogout}>로그아웃</button>
    </>
  )
}