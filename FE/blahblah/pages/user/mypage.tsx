/* eslint-disable */
import { Container,Row,Col,ListGroup,Figure } from 'react-bootstrap';

export default function Mypage() {
  return (
    <>
      
      <Container>
        <Row>
        <Col>
      
      </Col>
      <Col>
      <div className="mypage">
      <Figure>
  <Figure.Image
    width={171}
    height={180}
    src="/user/young-man.png"
  />
</Figure>
      </div>
      <ListGroup variant="flush">
  <ListGroup.Item>이름:</ListGroup.Item>
  <ListGroup.Item>이메일주소</ListGroup.Item>
  <ListGroup.Item>모국어:</ListGroup.Item>
  <ListGroup.Item>구사언어:</ListGroup.Item>
  <ListGroup.Item>학습언어:</ListGroup.Item>
  <ListGroup.Item>성별:</ListGroup.Item>
  <ListGroup.Item>나이:</ListGroup.Item>
  <ListGroup.Item>자기소개:</ListGroup.Item>
</ListGroup>
      </Col>
      <Col>
      
      </Col>
        </Row>
  
    </Container>
    <style jsx>{`
        
        .mypage {
          display: flex;
  align-items: center;
  justify-content: center;
        }

      `}</style>
    </>
  )
}