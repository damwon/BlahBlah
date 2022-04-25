import NavBar from "./NavBar";
import { Container,Row,Col } from 'react-bootstrap';
export default function Layout( {children}){

  return <>
  <Container>
    <Row>
<Col><NavBar></NavBar></Col>
    </Row>
 
  </Container>
  <div>{children}</div>
  
  
  </>
}