import { Container,Row,Col,Carousel } from 'react-bootstrap';

export default function Home() {

  

  return <>
  <Container>
    <Row>
      <Col>
      <Carousel>
  {/* <Carousel.Item>
    <img
      className="d-block w-100"
      src="main/test.png"
      alt="First slide"
    />
    
  </Carousel.Item> */}
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="main/1.png"
      alt="Second slide"
    />

    
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="main/2.png"
      alt="Second slide"
    />

    
  </Carousel.Item>
  
</Carousel>
      </Col>
    </Row>
  </Container>

  

  </>
}

