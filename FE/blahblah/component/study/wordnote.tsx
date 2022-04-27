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

export default function Wordnote() {
  const router = useRouter();
  // modal 단어폴더 추가
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [wordTitle, setWordTitle] = useState("");
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };

  const writeWordTitle = () => {
    if (wordTitle === "") {
      alert("단어장 제목을 입력해주세요");
    } else {
      allAxios
        .post(
          `/wordbook`,
          {
            title: wordTitle,
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
      .get(`/wordbook?size=5&page=1`, { headers: setToken() })
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
      .delete(`/wordbook/${num}`, { headers: setToken() })
      .then((res) => {
        alert("단어장 " + title + " 삭제되었습니다.");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [dense, setDense] = useState(false);
  return (
    <>
      <h1 className="cent">word note</h1>
      <List dense={dense}>
        {file &&
          file.map((d: any, i: number) => {
            return (
              <ListItem
                style={{ width: "300px", margin: "0 auto" }}
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
                    router.push(`/wordnote/${d.id}`);
                  }}
                >
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    router.push(`/wordnote/${d.id}`);
                  }}
                  primary={d.title}
                />
              </ListItem>
            );
          })}
      </List>

      <div className="m">
        <Pagination count={5} variant="outlined" shape="rounded" />
      </div>
      <div className="mar-btn">
        <Button
          variant="contained"
          onClick={() => {
            handleShow();
            setWordTitle("");
          }}
        >
          단어장 추가
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
                  setWordTitle(e.target.value);
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
          <Button variant="contained" onClick={writeWordTitle}>
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
