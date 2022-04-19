import { Navbar,Container,Nav } from 'react-bootstrap';
import Link from "next/link";
import { useRouter } from "next/router";

export default function userNav() {
  return (
    <>
    {/* 테스트 */}
    <Navbar bg="black" variant="dark">
    <Container>
    <Link href="/user">
 <a className="navmenu">&nbsp;user처음페이지 &nbsp;</a>
  </Link>
    {/* <Navbar.Brand href="/user">user처음페이지</Navbar.Brand> */}
    <Nav className="me-auto">
    <Link href="/user/friends">
 <a className="navmenu">&nbsp;친구목록 &nbsp;</a>
  </Link>
  <Link href="/user/login">
 <a className="navmenu">&nbsp;로그인 &nbsp;</a>
  </Link>
  <Link href="/user/mypage">
 <a className="navmenu">&nbsp;마이페이지 &nbsp;</a>
  </Link>
  <Link href="/user/signup">
 <a className="navmenu">&nbsp;회원가입 &nbsp;</a>
  </Link>
  <Link href="/user/updatecheck">
 <a className="navmenu">&nbsp;회원정보수정 &nbsp;</a>
  </Link>
      {/* <Nav.Link href="/user/friends">친구목록</Nav.Link>
      <Nav.Link href="/user/login">로그인</Nav.Link>
      <Nav.Link href="/user/mypage">마이페이지</Nav.Link>
      <Nav.Link href="/user/signup">회원가입</Nav.Link>
      <Nav.Link href="/user/updatecheck">회원정보수정</Nav.Link> */}
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