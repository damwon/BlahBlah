import { Navbar, Container, Nav } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
export default function userNav() {
  return (
    <>
      {/* 테스트 */}
      <div className="nav">
      <div className="navright">
      <Link href="/">
            <a className="mainnav">
              BlahBlah
              {/* <img src="logo/blbl.png" height={30}></img> */}
              </a>
          </Link>
      </div>
            <div className="navright">
            <Link href="/chat">
              <a className="navmenu">&nbsp;채팅 &nbsp;</a>
            </Link>
            <Link href="/wordnote">
              <a className="navmenu">&nbsp;워드 &nbsp;</a>
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
            <Link href="/user/friends">
 <a className="navmenu">&nbsp;친구 &nbsp;</a>
  </Link>
  <Link href="/user/login">
 <a className="navmenu">&nbsp;로긴 &nbsp;</a>
  </Link>
  <Link href="/user/mypage">
 <a className="navmenu">&nbsp;mypage &nbsp;</a>
  </Link>
  <Link href="/user/signup">
 <a className="navmenu">&nbsp;가입 &nbsp;</a>
  </Link>
  <Link href="/user/updatecheck">
 <a className="navmenu">&nbsp;회원수정 &nbsp;</a>
  </Link>
            </div>
      </div>
      <style jsx>{`
      .nav{
 
        margin-top:15px;
        margin-bottom:30px;
        background-color:white;
      }
        .mainnav{
          color:#00ccb1;
          font-size:36px;
          font-weight:bold;
          text-decoration-line: none;
          display:inline-block;
          
        }
        .navmenu {
          color: black;
          text-decoration-line: none;
          display: inline;
          align-items:center;
          font-size: 16px;
          font-weight:bold;
          margin-bottom:0;
        }
        .navmenu:hover{
          color:#00ccb1;
        }
      `}</style>
    </>
  );
}
