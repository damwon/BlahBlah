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
import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import allAxios from "../../lib/allAxios";
import { useRouter } from "next/router";
export default function Mynote() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [noteTitle, setNoteTitle] = useState("");
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };

  const writeNoteTitle = () => {
    if (noteTitle === "") {
      alert("메모장 제목을 입력해주세요");
    } else {
      allAxios
        .post(
          `/memo`,
          {
            title: noteTitle,
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
  const [file, setFile]: any = useState([{}, {}, {}]);
  useEffect(() => {
    allAxios
      .get(`/memo`, { headers: setToken() })
      .then((res) => {
        setFile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // wordlist 지우기
  const lstDelete = (num: number, title: string) => {
    allAxios
      .delete(`/memo/${num}`, { headers: setToken() })
      .then((res) => {
        alert("메모장 " + title + " 삭제되었습니다.");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [dense, setDense] = useState(false);
  return (
    <>
      <h1 className="cent">my note</h1>
      <List dense={dense}>
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
                        console.log(d);
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
                      router.push(`/note/${d.id}`);
                    }}
                  >
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      router.push(`/note/${d.id}`);
                    }}
                    primary={d.title}
                  />
                </ListItem>
              );
            })
          : null}
      </List>
      <div className="m">
        <Pagination count={5} variant="outlined" shape="rounded" />
      </div>
      <div className="mar-btn">
        <Button
          variant="contained"
          onClick={() => {
            handleShow();
            setNoteTitle("");
          }}
        >
          메모장 추가
        </Button>
      </div>
      {/* modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>단어장 제목을 입력해주세요.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid spacing={2} container>
            <Grid item xs={2}>
              <h4>제목</h4>
            </Grid>
            <Grid item xs={10}>
              <input
                onChange={(e: any) => {
                  setNoteTitle(e.target.value);
                }}
              ></input>
            </Grid>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" color="error" onClick={handleClose}>
            취소
          </Button>
          <div style={{ width: "10px" }}></div>
          <Button variant="contained" onClick={writeNoteTitle}>
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
            width: 300px;
            margin: 0 auto;
          }
          .mar-btn {
            width: 150px;
            margin-right: 20px;
            margin-left: auto;
          }
        `}
      </style>
    </>
  );
}
