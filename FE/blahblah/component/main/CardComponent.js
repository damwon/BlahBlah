import { Container,Row,Col,Carousel,Card,Button } from 'react-bootstrap';

export default function CardComponent() {

  

  return <>
  <Row>
    <Col>
    <Card style={{ width: '12rem' }}>
  <Card.Img variant="top" src="main/global.png" />
  <Card.Body>
    <Card.Title>먼곳에서도</Card.Title>
    <Card.Text>
      다양한 언어 배우기
    </Card.Text>
  </Card.Body>
</Card>
    </Col>
    <Col>
    <Card style={{ width: '12rem' }}>
  <Card.Img variant="top" src="main/friends.png" />
  <Card.Body>
    <Card.Title>글로벌 친구</Card.Title>
    <Card.Text>
      다른나라 친구 만나기
    </Card.Text>
  </Card.Body>
</Card>
    </Col>
    <Col>
    <Card style={{ width: '12rem' }}>
  <Card.Img variant="top" src="main/remote.png" />
  <Card.Body>
    <Card.Title>컴퓨터로 편하게</Card.Title>
    <Card.Text>
      집에서 편하게 만나기
    </Card.Text>
  </Card.Body>
</Card>
    </Col>
    <Col>
    <Card style={{ width: '12rem' }}>
  <Card.Img variant="top" src="main/languages.png"  />
  <Card.Body>
    <Card.Title>다양한 언어</Card.Title>
    <Card.Text>
      수많은 언어 배우기
    </Card.Text>
  </Card.Body>
</Card>
    </Col>
    
  </Row>
  </>

}

