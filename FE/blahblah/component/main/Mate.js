import { Container,Row,Col,Card,Button,ListGroup } from 'react-bootstrap';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function Mate(props) {

  

  return <>
  <Container>
    <Row>
      <Col>

      <Avatar
        alt="ProfileImage"
        src="/user/young-man.png"
        sx={{ width: 100, height: 100 }}
      />
    

      </Col>
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

