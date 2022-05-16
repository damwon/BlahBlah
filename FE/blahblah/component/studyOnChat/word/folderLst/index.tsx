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
import allAxios from "../../../../lib/allAxios";
import { useRouter } from "next/router";

export default function WordFolderLstChat({ handleTF }: any) {
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

  // pagination
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
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
  const [total, setTotal] = useState(1);
  const [file, setFile]: any = useState();
  const [myWidth, setMyWidth] = useState(84);
  useEffect(() => {
    allAxios
      .get(`/wordbook?size=5&page=${page}`, { headers: setToken() })
      .then((res) => {
        setFile(res.data.wordbookListRes);
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

  // wordlist 이름 변경
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
      alert("단어장 제목을 입력해주세요");
    } else {
      allAxios
        .put(
          `/wordbook/${changeIdx}`,
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
                    changeOpen(d);
                  }}
                >
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  style={{ cursor: "pointer" }}
                  onClick={() => handleTF(false, d.id)}
                  primary={d.title}
                />
              </ListItem>
            );
          })}
      </List>

      <div>
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
      </div>
      <br></br>
      <div className="mar-btn">
        <Button
          style={{
            backgroundColor: "#00ccb1",
          }}
          variant="contained"
          onClick={() => {
            handleShow();
            setWordTitle("");
          }}
        >
          단어장 추가
        </Button>
      </div>

      {/* 단어장 추가 modal */}
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
          <Button
            style={{
              backgroundColor: "#00ccb1",
            }}
            variant="contained"
            onClick={writeWordTitle}
          >
            저장
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 단어장 이름 변경 modal */}
      <Modal show={changeShow} onHide={changeClose}>
        <Modal.Header closeButton>
          <Modal.Title>단어장 제목을 수정해주세요.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid spacing={2} container>
            <Grid item xs={2}>
              <h4>제목</h4>
            </Grid>
            <Grid item xs={10}>
              <input value={title} onChange={titleChange}></input>
            </Grid>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" color="error" onClick={changeClose}>
            취소
          </Button>
          <div style={{ width: "10px" }}></div>
          <Button
            style={{
              backgroundColor: "#00ccb1",
            }}
            variant="contained"
            onClick={titleChangeClick}
          >
            수정
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
            width: 110px;
            margin-right: auto;
            margin-left: auto;
          }
        `}
      </style>
    </>
  );
}
