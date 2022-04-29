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
export default function WordNote() {
  const [show, setShow] = useState(false);
  const handleClose = () => {
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
  };

  const handleShow = () => {
    setShow(true);
    setWord(""), setMean("");
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

  const [words, setWords]: any = useState();
  useEffect(() => {
    if (String(id) != "NaN") {
      allAxios
        .get(`/wordbook/${id}?size=5&page=1`, {
          headers: setToken(),
        })
        .then((res) => {
          console.log(res.data);
          setWords(res.data.words);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  const wordDelete = () => {
    allAxios
      .delete(`/wrod/${id}`, {
        headers: setToken(),
      })
      .then((res) => {
        setWords(res.data.words);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [word, setWord] = useState("");
  const [mean, setMean] = useState("");
  const [dense, setDense] = useState(false);
  return (
    <>
      <Grid
        spacing={3}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Image
            priority
            src="/images/characters.PNG"
            alt="characters image"
            width="240"
            height="40"
            layout="responsive"
          />
          <h1 className="cent">Title:</h1>
          <List dense={dense}>
            {words &&
              words.map((d: any, i: number) => {
                return (
                  <ListItem
                    style={{ width: "300px", margin: "0 auto" }}
                    key={i}
                    secondaryAction={
                      <IconButton
                        onClick={() => {
                          console.log(d);
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
                );
              })}
          </List>
          {/* <Grid
            spacing={2}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={4}>
              <div className="cent">
                <h1>Word</h1>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="cent">
                <h1>Mean</h1>
                <p>물</p>
                <p>빨간색</p>
                <p>책</p>
                <p>보다</p>
              </div>
            </Grid>
          </Grid> */}
          <div className="m">
            <Button variant="primary" onClick={handleShow}>
              단어 추가하기
            </Button>
          </div>
        </Grid>
        <Grid item xs={2} />
      </Grid>

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
                style={{ minHeight: "100px" }}
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
                style={{ minHeight: "100px" }}
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
          <Button variant="primary" onClick={handleClose}>
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
            width: 200px;
            margin: 0 auto;
          }
        `}
      </style>
    </>
  );
}
