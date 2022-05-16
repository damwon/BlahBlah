import { Grid, Button, Pagination } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import allAxios from "../../lib/allAxios";
export default function QnA() {
  useEffect(() => {
    if (localStorage.getItem("jwt") === null) {
      alert("you need to login first.");
      router.push(`/user/login`);
    }
  });
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };
  const [myWidth, setMyWidth] = useState(84);
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
        if (res.data.totalPages <= 6) {
          setMyWidth(252 - (7 - res.data.totalPages) * 28);
        } else if (res.data.totalPages > 7) {
          setMyWidth(252);
        }
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
            src="/images/qna2.png"
            alt="qna image"
            width="200"
            height="30"
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
                      style={
                        d.ansCheck === 0
                          ? { width: 150, backgroundColor: "grey" }
                          : { width: 150, backgroundColor: "#00ccb1" }
                      }
                      variant="contained"
                    >
                      {d.ansCheck === 0 ? "no answered" : "answered"}
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

          <div>
            <Pagination
              style={{ width: `${myWidth}px`, margin: "auto" }}
              size="small"
              count={total}
              variant="outlined"
              shape="rounded"
              page={page}
              onChange={handleChange}
            />
          </div>
          <div style={{ width: "155px", margin: "20px auto" }}>
            <Button
              style={{
                backgroundColor: "#00ccb1",
              }}
              variant="contained"
              onClick={() => {
                router.push(`/qna/write`);
              }}
            >
              ask a question
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
