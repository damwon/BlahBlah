import { Navbar, Container, Nav } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect,useState } from "react";

export default function userNav() {

  const router = useRouter()
  const [isLogin,setIslogin] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log('로그인후 NavBar에서 jwt읽기')
    // console.log(localStorage.getItem("jwt"))
    if (token) {
      setIslogin(true)
    }
  }, []);

  const onLogout = (event) => {
    event.preventDefault();
    setIslogin(false);
    localStorage.removeItem("jwt");
    // location.reload()
    // console.log(localStorage.getItem("key"))
    router.push("/user/login")
  };

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
              {
                isLogin===false
                ?<><Link href="/user/login">
                <a className="navmenu">&nbsp;로그인&nbsp;</a>
                  </Link>
              <Link href="/user/signup">
                <a className="navmenu">&nbsp;가입(미완) &nbsp;</a>
                  </Link>
                  <Link href="/user/signup2">
                <a className="navmenu">&nbsp;가입(됨) &nbsp;</a>
                  </Link>
                  </>
                :<>
                <Link href="/user/mypage">
            <a className="navmenu">&nbsp;마이페이지 &nbsp;</a>
              </Link>
                <a className="navmenu" onClick={onLogout}>&nbsp;로그아웃&nbsp;</a>
                  </>
              }
              
              
                     
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
