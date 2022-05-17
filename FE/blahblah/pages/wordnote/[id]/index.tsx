import {
  Pagination,
  Grid,
  List,
  ListItem,
  IconButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LibraryBooks from "@mui/icons-material/LibraryBooks";
import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Swal from "sweetalert2";
import allAxios from "../../../lib/allAxios";
export default function WordNote() {
  const [show, setShow] = useState(false);
  const write = () => {
    if (word === "") {
      Swal.fire({
        title: "please write word",
        confirmButtonColor: "#00ccb1",
      });
    } else if (mean === "") {
      Swal.fire({
        title: "please write meaning",
        confirmButtonColor: "#00ccb1",
      });
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
        .then(() => {
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
  const id = Number(router.query.id);
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };

  const [total, setTotal] = useState(1);
  const [words, setWords]: any = useState();
  const [title, setTitle] = useState();
  const [myWidth, setMyWidth] = useState(84);
  useEffect(() => {
    if (String(id) != "NaN") {
      allAxios
        .get(`/wordbook/${id}?size=16&page=${page}`, {
          headers: setToken(),
        })
        .then((res) => {
          setTitle(res.data.wordBookTitle);
          setWords(res.data.wordListRes);
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
        Swal.fire({
          title: "the word is deleted",
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
            src="/images/characters.PNG"
            alt="characters image"
            width="280"
            height="40"
            layout="responsive"
          /> */}
          <h1 className="cent">{title}</h1>
          <List dense={dense}>
            <Grid container spacing={4}>
              {words &&
                words.map((d: any, i: number) => {
                  return (
                    <Grid item xs={3} key={i}>
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
                          <div title="Copy">
                            <Avatar>
                              <LibraryBooks
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  navigator.clipboard.writeText(d.word)
                                }
                              />
                            </Avatar>
                          </div>
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
                  please write the first word!
                </h1>
              );
            })}

          <br></br>
          <div className="m" style={{ width: "189px" }}>
            <Button
              style={{
                backgroundColor: "grey",
              }}
              variant="contained"
              onClick={() => {
                router.push(`/study`);
              }}
            >
              Back
            </Button>{" "}
            <Button
              style={{
                backgroundColor: "#00ccb1",
              }}
              variant="contained"
              onClick={handleShow}
            >
              Add word
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Write your new word!</Modal.Title>
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
          <Button color="error" variant="contained" onClick={handleClose}>
            cancel
          </Button>
          <Button
            style={{
              backgroundColor: "#00ccb1",
            }}
            variant="contained"
            onClick={write}
          >
            save
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
