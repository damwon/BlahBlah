/* eslint-disable */
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { useEffect,useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import Mate from '../../component/main/Mate'

export default function Index() {

  const [mate,setMate] = useState<any>()

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
  }, []);
  return (
    <>
    <Container>
    <Row>
      <Col>블라메이트, 디자인은..내일..
      {
        mate
        ?<>{
          mate.map(function(a:any,i:any){
            return<>
            {/* {a.email} */}
            <Mate user={a} key={i}></Mate>
            </>
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
    </>
  )
}