import {
  Button,
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
import FolderIcon from "@mui/icons-material/Folder";
import { Modal, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import allAxios from "../../lib/allAxios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
export default function Recordnote() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [recordTitle, setRecordTitle] = useState("");
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };

  // pagination
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const writeRecordTitle = () => {
    if (recordTitle === "") {
      Swal.fire({
        title: "please write the title",
        confirmButtonColor: "#00ccb1",
      });
    } else {
      allAxios
        .post(
          `/recordbook`,
          {
            title: recordTitle,
          },
          {
            headers: setToken(),
          }
        )
        .then(() => {
          handleClose();
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // list불러오기
  const [total, setTotal] = useState(1);
  const [file, setFile]: any = useState([{}, {}, {}]);
  const [myWidth, setMyWidth] = useState(84);
  useEffect(() => {
    allAxios
      .get(`/recordbook`, { headers: setToken() })
      .then((res) => {
        setFile(res.data.recordbookListRes);
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

  // wordlist 지우기
  const lstDelete = (num: number, title: string) => {
    allAxios
      .delete(`/recordbook/${num}`, { headers: setToken() })
      .then((res) => {
        Swal.fire({
          title: "The " + title + " is deleted",
          confirmButtonColor: "#00ccb1",
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // notelist 이름 변경
  const [changeShow, setChangeShow] = useState(false);
  const changeClose = () => setChangeShow(false);
  const changeOpen = (d: any) => {
    setChangeShow(true);
    setTitle(d.title);
    setChangeIdx(d.id);
  };
  const [title, setTitle] = useState();
  const [changeIdx, setChangeIdx] = useState(1);
  const titleChange = (e: any) => {
    const val = e.target.value;
    setTitle(val);
  };
  const titleChangeClick = () => {
    if (title === "") {
      Swal.fire({
        title: "please write the title",
        confirmButtonColor: "#00ccb1",
      });
    } else {
      allAxios
        .put(
          `/recordbook/${changeIdx}`,
          {
            title: title,
          },
          {
            headers: setToken(),
          }
        )
        .then(() => {
          changeClose();
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [dense, setDense] = useState(false);
  return (
    <>
      <Card style={{ width: "21.5vw" }}>
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>record note</Card.Title>
          <List dense={dense} style={{ height: "320px" }}>
            {file
              ? file.map((d: any, i: number) => {
                  return (
                    <ListItem
                      key={i}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => {
                            lstDelete(d.id, d.title);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          changeOpen(d);
                        }}
                      >
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          router.push(`/record/${d.id}`);
                        }}
                        primary={d.title}
                      />
                    </ListItem>
                  );
                })
              : null}
          </List>
        </Card.Body>
      </Card>
      <div className="m">
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
      <br></br>
      <div style={{ width: "171px", margin: "auto" }}>
        <Button
          style={{
            backgroundColor: "#00ccb1",
          }}
          variant="contained"
          onClick={() => {
            handleShow();
            setRecordTitle("");
          }}
        >
          Add recordnote
        </Button>
      </div>
      {/* modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please write title.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid spacing={2} container>
            <Grid item xs={2}>
              <h4>Title</h4>
            </Grid>
            <Grid item xs={10}>
              <input
                onChange={(e: any) => {
                  setRecordTitle(e.target.value);
                }}
              ></input>
            </Grid>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" color="error" onClick={handleClose}>
            cancel
          </Button>
          <div style={{ width: "10px" }}></div>
          <Button
            style={{
              backgroundColor: "#00ccb1",
            }}
            variant="contained"
            onClick={writeRecordTitle}
          >
            save
          </Button>
        </Modal.Footer>
      </Modal>
      {/* 음성폴더 이름 변경 modal */}
      <Modal show={changeShow} onHide={changeClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please rewrite title.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid spacing={2} container>
            <Grid item xs={2}>
              <h4>Title</h4>
            </Grid>
            <Grid item xs={10}>
              <input value={title} onChange={titleChange}></input>
            </Grid>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" color="error" onClick={changeClose}>
            cancel
          </Button>
          <div style={{ width: "10px" }}></div>
          <Button
            style={{
              backgroundColor: "#00ccb1",
            }}
            variant="contained"
            onClick={titleChangeClick}
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
        `}
      </style>
    </>
  );
}
