import { Grid, Button } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import allAxios from "../../../../lib/allAxios";
import { useRouter } from "next/router";
export default function AnswerDetail() {
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
  const [answer, setAnswer] = useState();
  const [idx, setIdx] = useState(1);
  const [ans, setAns] = useState(0);
  const [time, setTime] = useState(1);
  useEffect(() => {
    if (String(id) != "NaN") {
      allAxios
        .get(`/qna/admin/${id}`, { headers: setToken() })
        .then((res) => {
          console.log(res);
          const ans = res.data.answer;
          if (ans) {
            setAns(1);
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

  const write = () => {
    if (answer === "") {
      alert("답변을 작성해주세요");
    } else {
      allAxios
        .post(
          `qna/admin/${id}`,
          {
            answer: answer,
          },
          {
            headers: setToken(),
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={2} />
      <Grid item xs={8}>
        <Image
          src="/images/qnaAnswer.PNG"
          alt="qnaAnswer image"
          width="200"
          height="40"
          layout="responsive"
          priority
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
          <hr style={{ width: "100vw" }}></hr>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={2} />
          <Grid item xs={8}>
            <textarea
              onChange={(e: any) => {
                setAnswer(e.target.value);
              }}
              placeholder="답변 내용을 작성해주세요"
              style={{ minHeight: 200, width: "100%" }}
            />
          </Grid>
          <Grid item xs={2} />
        </Grid>

        <br></br>
        <br></br>
        <div className="m">
          <Button
            variant="contained"
            onClick={() => {
              router.push(`/admin/answer`);
            }}
          >
            목록
          </Button>{" "}
          <Button variant="contained" onClick={write}>
            작성
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
