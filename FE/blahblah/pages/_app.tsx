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
          a {
            color: black;
          }
        `}
      </style>
    </>
  );
}

export default MyApp;
