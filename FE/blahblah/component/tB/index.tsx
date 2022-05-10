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
import allAxios from "../../lib/allAxios";
export default function TB(props: any) {
  const [show, setShow] = useState(false);
  const write = () => {
    if (word === "") {
      alert("단어를 입력해주세요");
    } else if (mean === "") {
      alert("뜻을 입력해주세요");
    } else {
      allAxios
        .post(
          `word/${id}`,
          {
            meaning: mean,
            word: word,
          },
          {
            headers: setToken(),
          }
        )
        .then((res) => {
          setShow(false);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
    setWord(""), setMean("");
  };

  // pagination
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const router = useRouter();
  // const id = props.wordId;
  const id = props.wordId;
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };

  const [total, setTotal] = useState(1);
  const [words, setWords]: any = useState();
  useEffect(() => {
    if (String(id) != "NaN") {
      allAxios
        .get(`/wordbook/${id}?size=10&page=${page}`, {
          headers: setToken(),
        })
        .then((res) => {
          console.log(res);
          setWords(res.data.wordListRes);
          setTotal(res.data.totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id, page]);

  const [word, setWord] = useState("");
  const [mean, setMean] = useState("");
  const [dense, setDense] = useState(false);

  const delWord = (d: any) => {
    allAxios
      .delete(`word/${d.id}`, {
        headers: setToken(),
      })
      .then((res) => {
        alert("단어가 삭제되었습니다.");
        window.location.reload();
      })

      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <h1 className="cent">Title:</h1>
      <List dense={dense}>
        <Grid container spacing={2}>
          {words &&
            words.map((d: any, i: number) => {
              return (
                <Grid item xs={6} key={i}>
                  <ListItem
                    style={{ width: "250px", margin: "0 auto" }}
                    secondaryAction={
                      <IconButton
                        onClick={() => {
                          delWord(d);
                        }}
                        edge="end"
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <LibraryBooks />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={d.word} secondary={d.meaning} />
                  </ListItem>
                </Grid>
              );
            })}
        </Grid>
      </List>
      {words &&
        words.length === 0 &&
        [0].map((d: any, i: number) => {
          return (
            <h1 key={i} style={{ width: "500px", margin: "auto" }}>
              새 단어를 입력해주세요!
            </h1>
          );
        })}

      <br></br>
      <div className="m" style={{ width: "300px" }}>
        <Button variant="secondary" onClick={() => props.handleTF(true, "1")}>
          뒤로
        </Button>{" "}
        <Button variant="primary" onClick={handleShow}>
          단어 추가하기
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>추가할 단어를 입력해보세요!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid container spacing={3}>
            <Grid item xs={5}>
              <h3>word</h3>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={6}>
              <h3>mean</h3>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={5}>
              <textarea
                autoFocus
                onChange={(e) => {
                  setWord(e.target.value);
                }}
                style={{ minHeight: "60px" }}
                className="clean-textarea"
                placeholder="word"
              ></textarea>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={6}>
              <textarea
                autoFocus
                onChange={(e) => {
                  setMean(e.target.value);
                }}
                style={{ minHeight: "60px" }}
                className="clean-textarea"
                placeholder="mean"
              ></textarea>
            </Grid>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" onClick={write}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>

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
