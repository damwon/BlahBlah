import { Pagination, Grid, List, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import allAxios from "../../../lib/allAxios";
import Swal from "sweetalert2";
export default function WordNote() {
  const [show, setShow] = useState(false);

  // pagination
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const router = useRouter();
  const id = Number(router.query.id);
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };

  const [total, setTotal] = useState(1);
  const [audios, setAudios]: any = useState();
  const [title, setTitle] = useState();
  const [myWidth, setMyWidth] = useState(84);
  useEffect(() => {
    if (String(id) != "NaN") {
      allAxios
        .get(`/recordbook/${id}?size=16&page=${page}`, {
          headers: setToken(),
        })
        .then((res) => {
          setTitle(res.data.recordBookTitle);
          setTotal(res.data.totalPages);
          setAudios(res.data.recordListRes);
          if (res.data.totalPages <= 6) {
            setMyWidth(252 - (7 - res.data.totalPages) * 28);
          } else if (res.data.totalPages > 7) {
            setMyWidth(252);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id, page]);

  const [dense, setDense] = useState(false);

  const delRecord = (d: any) => {
    allAxios
      .delete(`record/${d.id}`, {
        headers: setToken(),
      })
      .then(() => {
        Swal.fire({
          title: "The record file is deleted.",
          confirmButtonColor: "#00ccb1",
        });
        window.location.reload();
      })

      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Grid
        spacing={3}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={1} />
        <Grid item xs={10}>
          {/* <Image
            priority
            src="/images/recording.PNG"
            alt="recording image"
            width="200"
            height="40"
            layout="responsive"
          /> */}
          <h1 className="cent">{title}</h1>
          <br></br>
          <br></br>
          <br></br>
          <List dense={dense}>
            <Grid container spacing={4}>
              {audios &&
                audios.map((d: any, i: number) => {
                  return (
                    <Grid item xs={3} key={i}>
                      <h5 style={{ marginLeft: "20px" }}>{d.title}</h5>
                      <audio
                        src={d.recordUrl}
                        controls
                        controlsList="nodownload"
                      />
                      <IconButton
                        style={{ marginBottom: "50px" }}
                        onClick={() => {
                          delRecord(d);
                        }}
                        edge="end"
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  );
                })}
            </Grid>
          </List>
          {audios &&
            audios.length === 0 &&
            [0].map((d: any, i: number) => {
              return (
                <h1 key={i} style={{ width: "500px", margin: "auto" }}>
                  Please add your first record file.
                </h1>
              );
            })}

          <br></br>
          <div className="m" style={{ width: "72px" }}>
            <Button
              style={{ backgroundColor: "grey" }}
              variant="contained"
              onClick={() => {
                router.push(`/study`);
              }}
            >
              Back
            </Button>
          </div>
          <br></br>
          <div className="m" style={{ width: "400px" }}>
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
        </Grid>
        <Grid item xs={1} />
      </Grid>

      <style jsx>
        {`
          .cent {
            text-align: center;
          }
          .m {
            margin: 0 auto;
          }
        `}
      </style>
    </>
  );
}
