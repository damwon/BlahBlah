import { useEffect, useState } from "react";
import {
  Button,
  Grid,
  List,
  ListItem,
  IconButton,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Modal } from "react-bootstrap";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import allAxios from "../../lib/allAxios";
import { useRouter } from "next/router";
export default function Index() {
  const router = useRouter();
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };
  const [feeds, setFeeds]: any = useState();
  const [friendFeeds, setFriendFeeds]: any = useState();
  useEffect(() => {
    allAxios
      .get(`/feed`, { headers: setToken() })
      .then((res) => {
        setFeeds(res.data);
        setShowFeeds(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    allAxios
      .get(`/feed`, { headers: setToken() })
      .then((res) => {
        setFriendFeeds(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setFile();
  };
  const [dense, setDense] = useState(false);
  const [content, setContent]: any = useState();
  const writeFeed = () => {
    const formData = new FormData();
    formData.append("image", file);
    const data = {
      content: content,
      open: true,
    };
    formData.append(
      "feedPostReq",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    console.log(file);
    console.log(data);
    console.log(formData);
    allAxios
      .post(`/feed`, formData, { headers: setToken() })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [file, setFile]: any = useState(0);
  const handleFile = (e: any) => {
    const imgFile = e.target.files[0];
    setFile(imgFile);
  };

  const [btnColor, setBtnColor] = useState("primary");
  const [btnName, setBtnName] = useState("피드 전체 보기");
  const [showFeeds, setShowFeeds]: any = useState();
  const btnChange = () => {
    if (btnColor === "primary") {
      setBtnColor("success");
      setBtnName("친구 피드만 보기");
      setShowFeeds(friendFeeds);
    } else {
      setBtnColor("primary");
      setBtnName("피드 전체 보기");
      setShowFeeds(feeds);
    }
  };
  return (
    <>
      <Grid spacing={3} container>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <div>
            <Button
              style={{ width: 100 }}
              variant="contained"
              color="primary"
              size="small"
              onClick={handleShow}
            >
              피드 작성
            </Button>
            <Button
              style={{ width: 150 }}
              variant="contained"
              color={btnColor}
              size="small"
              onClick={btnChange}
            >
              {btnName}
            </Button>
          </div>
          <List dense={dense}>
            {showFeeds &&
              showFeeds.map((d: any, i: number) => {
                console.log(d);
                return (
                  <ListItem
                    key={i}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <div className="container">
                        <div className="outer">
                          {/* <Image
                            className="profile"
                            src={}
                            alt="finger image"
                            width="200%"
                            height="200%"
                            layout="responsive"
                          ></Image> */}
                          <div className="innerLT"></div>
                          <div className="innerRT"></div>
                          <div className="innerLB">
                            <Image
                              className="report"
                              src="/images/siren.png"
                              alt="report image"
                              width="26"
                              height="26"
                            ></Image>
                          </div>
                          <div className="innerRB"></div>
                        </div>
                      </div>
                    </ListItemAvatar>
                    <ListItemText
                      style={{ cursor: "pointer", margin: "10px" }}
                      onClick={() => {
                        router.push(`/note/${d.id}`);
                      }}
                      primary={d.title}
                    />
                    <h5>
                      내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
                    </h5>
                  </ListItem>
                );
              })}
          </List>
        </Grid>
        <Grid item xs={3} />
      </Grid>
      {/* 단어장 추가 modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>피드를 작성해주세요.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid spacing={2} container>
            <Grid item xs={2}>
              <h4>내용</h4>
            </Grid>
            <Grid item xs={10}>
              <input
                onChange={(e: any) => {
                  setContent(e.target.value);
                }}
              ></input>
            </Grid>
          </Grid>
          <input type="file" name="file" onChange={(e) => handleFile(e)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" color="error" onClick={handleClose}>
            취소
          </Button>
          <div style={{ width: "10px" }}></div>
          <Button variant="contained" onClick={writeFeed}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>
      <style jsx>
        {`
          .container {
            width: 150px;
            height: 150px;
            display: block;
            margin: 0 auto;
          }

          .outer {
            width: 200px !important;
            height: 200px !important;
            max-width: 150px !important; /* any size */
            max-height: 150px !important; /* any size */
            margin: auto;
            background-color: #6eafd4;
            border-radius: 50%;
            position: relative;
            overflow: hidden;
          }

          .innerLT {
            background-color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            position: absolute;
            top: 20px;
            left: 20px;
            cursor: pointer;
          }
          .innerRT {
            background-color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            position: absolute;
            top: 20px;
            right: 20px;
            cursor: pointer;
          }
          .innerLB {
            background-color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            position: absolute;
            bottom: 20px;
            left: 20px;
            cursor: pointer;
          }
          .innerRB {
            background-color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            position: absolute;
            bottom: 20px;
            right: 20px;
            cursor: pointer;
          }

          .inner:hover {
            background-color: #5555ff;
          }
        `}
      </style>
    </>
  );
}
