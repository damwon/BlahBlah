import { Grid, Pagination, Button } from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import allAxios from "../../../lib/allAxios";
export default function Answer() {
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };
  const router = useRouter();
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const [total, setTotal] = useState(1);
  const [qna, setQna]: any = useState();
  useEffect(() => {
    allAxios
      // .get(`qna/admin?size=5&page=${page}`, { headers: setToken() })
      .get(`qna/admin?size=20&page=${page}`, { headers: setToken() })
      .then((res) => {
        setQna(res.data.myQnaListRes);
        setTotal(res.data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Grid spacing={3} container direction="row">
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
          {qna &&
            qna.map((d: any, i: number) => {
              return (
                <Grid
                  container
                  spacing={3}
                  key={i}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    router.push(`/admin/answer/${d.id}`);
                  }}
                >
                  <Grid item xs={2}>
                    <Button
                      style={{ width: 100 }}
                      variant="contained"
                      color={d.ansCheck === 0 ? "error" : "primary"}
                    >
                      {d.ansCheck === 0 ? "답변 대기" : "답변 완료"}
                    </Button>
                  </Grid>
                  <Grid item xs={7}>
                    <h5>{d.title}</h5>
                  </Grid>
                  <Grid item xs={3} style={{ textAlign: "center" }}>
                    {d.createdAt.substr(0, 10)}
                  </Grid>
                  <hr style={{ width: "100vw" }}></hr>
                </Grid>
              );
            })}

          <div className="m" style={{ width: 400 }}>
            <Pagination
              count={total}
              variant="outlined"
              shape="rounded"
              page={page}
              onChange={handleChange}
            />
          </div>
        </Grid>
        <Grid item xs={2} />
      </Grid>
      <style jsx>
        {`
          .m {
            width: 400px;
            margin: 0 auto;
          }
        `}
      </style>
    </>
  );
}
