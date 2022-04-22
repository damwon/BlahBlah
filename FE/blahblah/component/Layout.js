import NavBar from "./NavBar";
import { Container,Row,Col } from 'react-bootstrap';
export default function Layout( {children}){

  return <>
  <Container>
  <Row>
    {/* <Col sm={1} xs={1}></Col> */}
    <Col><NavBar></NavBar></Col>
    {/* <Col sm={1} xs={1}></Col> */}
  </Row>
  <Row>
    {/* <Col sm={1} xs={1}></Col> */}
    <Col><div>{children}</div></Col>
    {/* <Col sm={1} xs={1}></Col> */}
  </Row>
</Container>
  
  
  </>
}