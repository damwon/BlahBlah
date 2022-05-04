import { Grid, Button } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import allAxios from "../../../lib/allAxios";
import { useRouter } from "next/router";
export default function QnaInfo() {
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };
  const router = useRouter();
  const id = Number(router.query.id);

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [time, setTime] = useState(1);
  useEffect(() => {
    if (String(id) != "NaN") {
      allAxios
        .get(`/notice/${id}`, { headers: setToken() })
        .then((res) => {
          setTitle(res.data.title);
          setContent(res.data.content);
          setTime(res.data.createdAt.substr(0, 10));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={2} />
      <Grid item xs={8}>
        <Image
          priority
          src="/images/notice2.PNG"
          alt="notice image"
          width="200"
          height="40"
          layout="responsive"
        />
        <br></br>
        <br></br>
        <Grid container spacing={3}>
          <hr
            style={{
              width: "100vw",
              height: "3px",
            }}
          ></hr>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <Button
              size="small"
              style={{ width: 100 }}
              variant="contained"
              color="primary"
            >
              공지
            </Button>
          </Grid>
          <Grid item xs={7}>
            <h4>{title}</h4>
          </Grid>
          <Grid item xs={3}>
            {time}
          </Grid>
          <hr style={{ width: "100vw" }}></hr>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            {content}
          </Grid>
          <Grid item xs={2}></Grid>
          <hr style={{ width: "100vw" }}></hr>
        </Grid>

        <br></br>
        <br></br>
        <div className="m">
          <Button
            variant="contained"
            onClick={() => {
              router.push(`/notice`);
            }}
          >
            목록
          </Button>{" "}
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
