import { Container,Row,Col,Carousel,Card,Button } from 'react-bootstrap';
import Carou from '../component/main/Carou'
import CardComponent from '../component/main/CardComponent'
export default function Home() {

  

  return <>
  <Container>
    <Row>
      <Col>
      <Carou></Carou>
      </Col>
    </Row>
    <Row>
      <div className="ex">
      </div>
    {/* <div className="carddiv">
    <CardComponent></CardComponent>
    </div> */}
    </Row>
    
  </Container>

  <style jsx>{`
        .ex{
          text-align:center;
        }
        .carddiv{
          margin:20px;
        }

      `}</style>

  </>
}

