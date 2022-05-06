import { Container,Row,Col,Card,Button,ListGroup } from 'react-bootstrap';

export default function Mate(props) {

  

  return <>
  <Container>
    <Row>
      <Col></Col>
      <Col>  
      <Card style={{ width: '14rem' }}>
  <Card.Img variant="top" src="/user/young-man.png" />
  <Card.Body>
    <Card.Title>{props.user.name}
    </Card.Title>
    <Card.Text>
    {props.user.description}
    </Card.Text>
  </Card.Body>
</Card>
      </Col>
      <Col>
      <ListGroup variant="flush">
  <ListGroup.Item>나이 : {props.user.age}</ListGroup.Item>
  <ListGroup.Item>성별 : {props.user.gender ===1
  ?<>남자</>
  :<>여자</>
  }</ListGroup.Item>


</ListGroup>
</Col>
  <Col></Col>
    </Row>
  </Container>






<style jsx>{`
        .matebox{
          border-radius: 15px;
          background-color:grey;
        }
        

      `}</style>
  </>
}

