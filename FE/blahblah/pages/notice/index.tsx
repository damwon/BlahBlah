import { Grid, Pagination, Button } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import allAxios from "../../lib/allAxios";
import { useRouter } from "next/router";
export default function Notice() {
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };
  const router = useRouter();
  const [notices, setNotices]: any = useState();
  const [total, setTotal] = useState(1);
  const [page, setPage] = useState(1);
  const [myWidth, setMyWidth] = useState(84);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  useEffect(() => {
    allAxios
      .get(`notice?size=5?`)
      .then((res) => {
        setNotices(res.data.noticeListRes);
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
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={2} />
      <Grid item xs={8}>
        <Image
          priority
          src="/images/notice2.png"
          alt="notice image"
          width="200"
          height="30"
          layout="responsive"
        />
        <br></br>
        <br></br>
        <Grid container spacing={3}>
          <hr></hr>
          <Grid
            item
            xs={2}
            className="text-bold"
            style={{ margin: "0 0 0 20px" }}
          >
            <p>Number</p>
          </Grid>
          <Grid item xs={7} className="text-center text-bold">
            <p>Title</p>
          </Grid>
          <Grid
            item
            xs={2}
            className="text-center text-bold"
            style={{ marginLeft: "30px" }}
          >
            <p>Date</p>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <hr
            style={{
              width: "100vw",
              height: "3px",
            }}
          ></hr>
        </Grid>
        {notices &&
          notices.map((d: any, i: number) => {
            return (
              <Grid
                container
                spacing={3}
                key={i}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  router.push(`notice/${d.id}`);
                }}
              >
                <Grid item xs={2}>
                  <Button
                    style={{
                      backgroundColor: "#00ccb1",
                      width: 100,
                    }}
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Notice
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
        <br></br>

        <div className="m" style={{ width: "250px" }}>
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
        <Grid item xs={2} />
      </Grid>
      <style jsx>
        {`
          .text-center {
            text-align: center;
          }
          p {
            font-size: medium;
            font-weight: 800;
          }
          .m {
            margin: 0 auto;
          }
        `}
      </style>
    </Grid>
  );
}
