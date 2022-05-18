import { Navbar, Container, Nav,Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function userNav(props) {
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
            <a className="navmenu">Find Blah Mate</a>
          </Link>
          <Link href="/feed">
            <a className="navmenu">Feed</a>
          </Link>
          <Link href="/chat">
            <a className="navmenu">Chat</a>
          </Link>
          <Link href="/study">
            <a className="navmenu">Study</a>
          </Link>
          <Link href="/qna">
            <a className="navmenu">QnA</a>
          </Link>
          <Link href="/notice">
            <a className="navmenu">Notice</a>
          </Link>
          {isLogin === false ? (
            <>
              <Link href="/user/login">
                <a className="navmenu">Login</a>
              </Link>
              <Link href="/user/email">
              <Button className="btncs" 
                   variant="outline-secondary">Sign Up</Button>
                {/* <a className="navmenu">Sign Up</a> */}
              </Link>
              {/* <Link href="/user/signup2">
                <a className="navmenu">가입(됨)</a>
                  </Link> */}
            </>
          ) : (
            <>
            <a className="navmenu" onClick={onLogout}>
                Logout
              </a>
              <Link href="/user/mypage">
              <Button className="btncs" 
                   variant="outline-secondary">Mypage</Button>
                {/* <a className="navmenu">Mypage</a> */}
              </Link>
              
            </>
          )}
        </div>
      </div>
      {/* <hr></hr> */}
      <style jsx>{`
        .nav {
          margin-top: 10px;
          margin-bottom: 20px;
          background-color:transparent;
          // 배경색 투명하게하기
          // background-color: #ffffff;
        // opacity: 0.5; 이건 그냥 투명도 조절
          // background-color: #fffad1;
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
          cursor:pointer;
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
