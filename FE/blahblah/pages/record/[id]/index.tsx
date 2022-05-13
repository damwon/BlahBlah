import {
  Pagination,
  Grid,
  List,
  ListItem,
  IconButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LibraryBooks from "@mui/icons-material/LibraryBooks";
import { Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import allAxios from "../../../lib/allAxios";
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
        alert("음성파일이 삭제되었습니다.");
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
          <Image
            priority
            src="/images/recording.PNG"
            alt="recording image"
            width="200"
            height="40"
            layout="responsive"
          />
          <h1 className="cent">{title}</h1>
          <List dense={dense}>
            <Grid container spacing={4}>
              {audios &&
                audios.map((d: any, i: number) => {
                  console.log(d);
                  return (
                    <div key={i}>
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
                    </div>
                  );
                })}
            </Grid>
          </List>
          {audios &&
            audios.length === 0 &&
            [0].map((d: any, i: number) => {
              return (
                <h1 key={i} style={{ width: "500px", margin: "auto" }}>
                  저장된 음성파일이 없습니다.
                </h1>
              );
            })}

          <br></br>
          <div className="m" style={{ width: "140px" }}>
            <Button
              variant="primary"
              onClick={() => {
                router.push(`/study`);
              }}
            >
              뒤로가기
            </Button>
          </div>
          <br></br>
          <div className="m" style={{ width: "400px" }}>
            <Pagination
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
