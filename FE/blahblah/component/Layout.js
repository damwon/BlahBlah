import NavBar from "./Navbar";
import { Container,Row,Col } from 'react-bootstrap';
export default function Layout( {children}){

  return <>
    <Container>
        <Row>
      <Col>
        <NavBar/>
      </Col>
        </Row>
  
    </Container>
    {/* <hr></hr> */}
  <div>{children}</div>
  </>
}
