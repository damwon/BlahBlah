import { Container,Row,Col } from 'react-bootstrap';
import axios from "axios";
export default function User() {
  const test = (event: any) => {
     axios({
      url: `https://blahblah.community:8443/api/auth/login`,
      method: "post",
      data: {
        'email': 'kimssafy@ssafy.com',
        'password': 'ssafy',
      },
    })
      .then((res) => {
        console.log(res)
        localStorage.setItem("jwt", res.data.accessToken);
      })
      .catch((err) => {
        console.log(err);
      });

  };
  return (
    <>
      
      <h1>UserIndex테스트페이지2232233</h1>
      <button onClick={test}>테스트</button>
    </>
  )
}