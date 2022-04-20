import { Navbar,Container,Nav } from 'react-bootstrap';
import Link from "next/link";
import { useRouter } from "next/router";

export default function userNav() {
  return (
    <>
    {/* 테스트 */}
    <Navbar bg="dark" variant="dark">
    <Container>
    <Link href="/">
 <a className="navmenu">&nbsp;blahblah메인 &nbsp;</a>
  </Link>
    {/* <Navbar.Brand href="/user">user처음페이지</Navbar.Brand> */}
    <Nav className="me-auto">
    <Link href="/user">
 <a className="navmenu">&nbsp;User작업 &nbsp;</a>
  </Link>
  <Link href="/chat">
 <a className="navmenu">&nbsp;채팅방 &nbsp;</a>
  </Link>
  <Link href="/wordnote">
 <a className="navmenu">&nbsp;워드노트 &nbsp;</a>
  </Link>
  <Link href="/study">
 <a className="navmenu">&nbsp;스터디 &nbsp;</a>
  </Link>
  <Link href="/qna">
 <a className="navmenu">&nbsp;QnA &nbsp;</a>
  </Link>
  <Link href="/qna/write">
 <a className="navmenu">&nbsp;Qna작성 &nbsp;</a>
  </Link>
  <Link href="/notice">
 <a className="navmenu">&nbsp;공지 &nbsp;</a>
  </Link>
  <Link href="/note">
 <a className="navmenu">&nbsp;노트 &nbsp;</a>
  </Link>
    </Nav>
    </Container>
  </Navbar>
    <style jsx>{`
        
        .navmenu {
          color: white;
          text-decoration-line: none;
          display: inline-block;
          margin: 0px;
          font-size: 24px;
        }

      `}</style>
    </>
    
  )
}