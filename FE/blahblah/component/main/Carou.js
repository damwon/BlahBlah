import { Container,Row,Col,Carousel,Card,Button } from 'react-bootstrap';

export default function Carou() {

  

  return <>

<Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="main/m1.png"
      alt="Second slide"
    />

    
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="main/m2.png"
      alt="Second slide"
    />

    
  </Carousel.Item>
  
  
</Carousel>
  

  </>
}

