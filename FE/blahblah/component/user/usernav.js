import { Navbar,Container,Nav } from 'react-bootstrap';
import Link from "next/link";
import { useRouter } from "next/router";

export default function userNav() {
  return (
    <>
    {/* 테스트 */}
    <div>
    <Link href="/user">
 <a className="navmenu">&nbsp;user처음페이지 &nbsp;</a>
  </Link>
    {/* <Navbar.Brand href="/user">user처음페이지</Navbar.Brand> */}
    
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
    </div>
    <style jsx>{`
        
        .navmenu {
          color: black;
          background-color:grey;
          text-decoration-line: none;
          display: inline-block;
          margin: 0px;
          font-size: 24px;
        }

      `}</style>
    </>
    
  )
}