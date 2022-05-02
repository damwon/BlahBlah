import { Grid, Button } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import allAxios from "../../../lib/allAxios";
import { useRouter } from "next/router";
import BorderColorIcon from "@mui/icons-material/BorderColor";
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
  const [idx, setIdx] = useState(1);
  const [ans, setAns] = useState(0);
  const [time, setTime] = useState(1);
  const [ansContent, setAnsContent] = useState(0);
  useEffect(() => {
    if (String(id) != "NaN") {
      allAxios
        .get(`/qna/${id}`, { headers: setToken() })
        .then((res) => {
          const ans = res.data.answer;
          if (ans) {
            setAns(1);
            setAnsContent(res.data.answer);
          }
          setTitle(res.data.title);
          setContent(res.data.content);
          setIdx(res.data.id);
          setTime(res.data.createdAt.substr(0, 10));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  const qnaDelete = () => {
    allAxios
      .delete(`/qna/${id}`, { headers: setToken() })
      .then((res) => {
        alert("문의글이 삭제되었습니다.");
        router.push(`/qna`);
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
          src="/images/notice.PNG"
          alt="notice2 image"
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
              style={{ width: 100 }}
              variant="contained"
              color={ans === 0 ? "error" : "primary"}
            >
              {ans === 0 ? "답변 대기" : "답변 완료"}
            </Button>
          </Grid>
          <Grid item xs={7}>
            <h5>{title}</h5>
          </Grid>
          <Grid item xs={3} style={{ textAlign: "center" }}>
            {time}
          </Grid>
          <hr style={{ width: "100vw" }}></hr>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            {content}
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
        {ans === 0
          ? null
          : [0].map((d: any, i: number) => {
              return (
                <Grid
                  container
                  spacing={3}
                  key={i}
                  style={{
                    marginTop: "2px",
                    backgroundColor: "rgb(216, 216, 216)",
                  }}
                >
                  <hr style={{ width: "100vw" }}></hr>
                  <Grid item xs={2}>
                    <div style={{ width: "5px", marginLeft: "auto" }}>
                      <BorderColorIcon color="primary"></BorderColorIcon>
                    </div>
                  </Grid>
                  <Grid item xs={8}>
                    {ansContent}
                  </Grid>
                  <Grid item xs={2} />
                </Grid>
              );
            })}
        <br></br>
        <br></br>
        <div className="m">
          <Button
            variant="contained"
            onClick={() => {
              router.push(`/qna`);
            }}
          >
            목록
          </Button>{" "}
          <Button variant="contained" color="error" onClick={qnaDelete}>
            삭제
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
