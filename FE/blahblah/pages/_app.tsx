import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import Layout from "../component/Layout";
import React, {useState,useEffect } from "react";
import "../styles/test.css"


function MyApp({ Component, pageProps }: AppProps) {

  const [bg,setBg] = useState(true)
  // const [test,setTest] = useState('testtesttest')

  
  return (
    <>
      <Layout>
        <Component {...pageProps} bg={bg} setBg={setBg}/>
      </Layout>
      <style jsx global>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');
          body{
            font-family: 'Noto Sans KR', sans-serif;
            background: ${bg ? "white" : "#f7f7f0;"};
            
          }
        a {
            color: black;
          }
        `}
      </style>
    </>
  );
}

export default MyApp;
