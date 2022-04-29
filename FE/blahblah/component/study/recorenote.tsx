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
export default function Recordnote() {
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

  const writeRecordTitle = () => {
    if (recordTitle === "") {
      alert("음성폴더 제목을 입력해주세요");
    } else {
      allAxios
        .post(
          `/memo`,
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
  useEffect(() => {
    allAxios
      //
      //
      //
      //
      //
      //
      //
      .get(`/wordbook`, { headers: setToken() })
      .then((res) => {
        setFile(res.data);
        setTotal(res.data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [dense, setDense] = useState(false);
  return (
    <>
      <h1 className="cent">record note</h1>
      <div className="m">
        <Pagination count={5} variant="outlined" shape="rounded" />
      </div>
      <br></br>
      <div className="mar-btn">
        <Button
          variant="contained"
          onClick={() => {
            handleShow();
            setRecordTitle("");
          }}
        >
          음성폴더 추가
        </Button>
      </div>
      {/* modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>음성폴더 제목을 입력해주세요.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid spacing={2} container>
            <Grid item xs={2}>
              <h4>제목</h4>
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
            취소
          </Button>
          <div style={{ width: "10px" }}></div>
          <Button variant="contained" onClick={writeRecordTitle}>
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
            margin-right: 60px;
            margin-left: auto;
          }
        `}
      </style>
    </>
  );
}
