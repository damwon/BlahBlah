import { Grid, Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import allAxios from "../../lib/allAxios";
import Swal from "sweetalert2";
export default function QnaWrite() {
  useEffect(() => {
    if (localStorage.getItem("jwt") === null) {
      Swal.fire({
        title: "Wrong approach",
        confirmButtonColor: "#00ccb1",
      });
      router.push(`/`);
    }
  });
  const router = useRouter();
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const write = () => {
    allAxios
      .post(
        `qna/`,
        {
          content: content,
          title: title,
        },
        {
          headers: setToken(),
        }
      )
      .then(() => {
        window.location.replace("/qna");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={2} />
      <Grid item xs={8}>
        <Image
          priority
          src="/images/qna2.png"
          alt="qna image"
          width="200"
          height="30"
          layout="responsive"
        />
        <br></br>
        <br></br>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <h3 className="text-center">Title</h3>
          </Grid>
          <Grid item xs={9}>
            <textarea
              onChange={(e: any) => {
                setTitle(e.target.value);
              }}
              placeholder="Write the title."
              style={{ width: "80%" }}
            />
          </Grid>
        </Grid>
        <br></br>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <h3 className="text-center">Content</h3>
          </Grid>
          <Grid item xs={9}>
            <textarea
              onChange={(e: any) => {
                setContent(e.target.value);
              }}
              placeholder="Write the content"
              style={{ minHeight: 300, width: "80%" }}
            />
          </Grid>
        </Grid>
        <br></br>
        <br></br>
        <div className="m">
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              router.push(`/qna`);
            }}
          >
            cancle
          </Button>{" "}
          <Button
            style={{
              backgroundColor: "#00ccb1",
            }}
            variant="contained"
            onClick={write}
          >
            write
          </Button>
        </div>
        <Grid item xs={2} />
      </Grid>
      <style jsx>
        {`
          .m {
            width: 200px;
            margin: 0 auto;
          }
        `}
      </style>
    </Grid>
  );
}
