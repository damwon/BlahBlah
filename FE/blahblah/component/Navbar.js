import { Navbar, Container, Nav } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function userNav() {
  const router = useRouter();
  const [isLogin, setIslogin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log("로그인후 NavBar에서 jwt읽기");
    // console.log(localStorage.getItem("jwt"))
    if (token) {
      setIslogin(true);
    }
  }, []);

  const onLogout = (event) => {
    event.preventDefault();
    setIslogin(false);
    localStorage.removeItem("jwt");
    // location.reload()
    // console.log(localStorage.getItem("key"))
    router.push("/user/login");
  };

  return (
    <>
      {/* 테스트 */}
      <div className="nav">
        <div>
          <Link href="/">
            <a className="mainnav">
              BlahBlah
              {/* <img src="logo/blbl.png" height={30}></img> */}
            </a>
          </Link>
        </div>
        <div className="navright">
          <Link href="/main">
            <a className="navmenu">블라 메이트 찾기</a>
          </Link>
          <Link href="/feed">
            <a className="navmenu">피드</a>
          </Link>
          <Link href="/chat">
            <a className="navmenu">채팅</a>
          </Link>
          <Link href="/study">
            <a className="navmenu">스터디</a>
          </Link>
          <Link href="/qna">
            <a className="navmenu">QnA</a>
          </Link>
          <Link href="/notice">
            <a className="navmenu">공지</a>
          </Link>
          {isLogin === false ? (
            <>
              <Link href="/user/login">
                <a className="navmenu">로그인</a>
              </Link>
              <Link href="/user/email">
                <a className="navmenu">가입</a>
              </Link>
              {/* <Link href="/user/signup2">
                <a className="navmenu">가입(됨)</a>
                  </Link> */}
            </>
          ) : (
            <>
              <Link href="/user/mypage">
                <a className="navmenu">마이페이지</a>
              </Link>
              <a className="navmenu" onClick={onLogout}>
                로그아웃
              </a>
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        .nav {
          margin-top: 10px;
          margin-bottom: 20px;
          background-color: white;
        }
        .mainnav {
          color: #00ccb1;
          font-size: 32px;
          font-weight: bold;
          text-decoration-line: none;
          display: inline-block;
        }
        .navmenu {
          color: black;
          text-decoration-line: none;
          display: inline;
          align-items: center;
          font-size: 16px;
          // font-weight:bold;
          margin: 10px;
        }
        .navmenu:hover {
          color: #00ccb1;
        }
        .navright {
          margin-left: 30px;
          margin-top: auto;
          margin-bottom: auto;
        }
      `}</style>
    </>
  );
}
