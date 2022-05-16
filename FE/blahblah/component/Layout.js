import NavBar from "./Navbar";
import Footer from "./Footer";
import { Container, Row, Col } from "react-bootstrap";
export default function Layout({ children }) {
  return (
    <div
      style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
    >
      <Container>
        <Row>
          <Col>
            <NavBar />
          </Col>
        </Row>
      </Container>
      <hr style={{marginTop:'0px',color:'#b5b5b5'}}></hr>
      {/* <hr></hr> */}
      <div>{children}</div>
      <Footer />
    </div>
  );
  

}
