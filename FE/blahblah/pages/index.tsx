import { Container, Row, Col, Carousel, Card, Button } from "react-bootstrap";
import Carou from "../component/main/Carou";
import CardComponent from "../component/main/CardComponent";
export default function Home() {
  return (
    <>
  <Container>
    <Row>
      <Col>
      <div style={{marginBottom:'40px'}}>      <Carou></Carou>
</div>
      </Col>
    </Row>
    <Row>
<Col><Card style={{ width: '24rem' }}>
  {/* <Card.Img variant="top" src="main/frd.png" /> */}
  <Card.Body>
    <Card.Title>{`Foreign Friend`}</Card.Title>
    <Card.Text>
    {`Find a friend that fits the language I want to learn and the language I can teach.
    Our site automatically matches Partner!`}
    </Card.Text>
    <Button className="btncs" variant="outline-secondary" style={{borderRadius:'30px',marginTop:'50px',marginBottom:'30px'}}>Find Blah Mate →</Button>
  </Card.Body>
</Card></Col>
<Col>
<Card style={{ width: '24rem' }}>
  {/* <Card.Img variant="top" src="main/feed.png" /> */}
  <Card.Body>
    <Card.Title>{`Community`}</Card.Title>
    <Card.Text>
    {`Talk to members in an open space, if you're not satisfied with matching, find a new friend here.`}
    </Card.Text>
    <Button className="btncs" variant="outline-secondary" style={{borderRadius:'30px',marginTop:'50px',marginBottom:'30px'}}>Feed →</Button>
  </Card.Body>
</Card>
</Col>
<Col><Card style={{ width: '24rem' }}>
  {/* <Card.Img variant="top" src="main/register.png" /> */}
  <Card.Body>
    <Card.Title>{`Be our Member`}</Card.Title>
    <Card.Text>
    {`To use all the features on our site, sign up now! Currently, all features are free.
    Press the button below to sign up.`}
    </Card.Text>
    <Button className="btncs" variant="outline-secondary" style={{borderRadius:'30px',marginTop:'50px',marginBottom:'30px'}}>Sign Up →</Button>
  </Card.Body>
</Card></Col>
    </Row>
    
  </Container>

  <style jsx>{`
        .ex{
          text-align:center;
        }
        .carddiv {
          margin: 20px;
        }
      `}</style>
    </>
  );
}
