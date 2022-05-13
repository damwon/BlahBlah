import { Grid, Button, Pagination } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import allAxios from "../../lib/allAxios";
export default function QnA() {
  useEffect(() => {
    if (localStorage.getItem("jwt") === null) {
      alert("로그인 후 사용해주세요.");
      router.push(`/`);
    }
  });
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };

  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const [total, setTotal] = useState(1);
  const [lst, setLst]: any = useState();
  useEffect(() => {
    allAxios
      .get(`/qna?size=5&page=${page}`, { headers: setToken() })
      .then((res) => {
        setLst(res.data.myQnaListRes);
        setTotal(res.data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);
  const router = useRouter();
  return (
    <>
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
          {lst &&
            lst.map((d: any, i: number) => {
              return (
                <Grid
                  container
                  spacing={3}
                  key={i}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    router.push(`qna/${d.id}`);
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
          <div className="m" style={{ width: 100 }}>
            <Button
              variant="contained"
              onClick={() => {
                router.push(`/qna/write`);
              }}
            >
              문의하기
            </Button>
          </div>
          <Grid item xs={2} />
        </Grid>
      </Grid>
      <style jsx>
        {`
          .m {
            margin: 0 auto;
          }
        `}
      </style>
    </>
  );
}
