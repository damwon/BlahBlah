import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import Layout from "../component/Layout";
import React, {useState,useEffect } from "react";
function MyApp({ Component, pageProps }: AppProps) {

  
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <style jsx global>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');
          body{
            font-family: 'Noto Sans KR', sans-serif;
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
