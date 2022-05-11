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
import { Image } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import EditIcon from "@mui/icons-material/Edit";
import allAxios from "../../lib/allAxios";
import { useRouter } from "next/router";
export default function Index() {
  const [update, setUpdate] = useState(1);
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
  }, [update]);

  const [userId, setUserId] = useState();
  useEffect(() => {
    allAxios
      .get(`/user/me`, { headers: setToken() })
      .then((res) => {
        setUserId(res.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    allAxios
      .get(`/feed/friends`, { headers: setToken() })
      .then((res) => {
        setFriendFeeds(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setFile();
  };
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow(false);
  const handleShow2 = () => {
    setShow(true);
    setFile();
  };
  const [dense, setDense] = useState(false);
  const [content, setContent]: any = useState();
  const writeFeed = () => {
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
    } else {
      formData.append(
        "image",
        new Blob([JSON.stringify(file)], { type: "multipart/form-data" })
      );
    }

    const data = {
      content: content,
      open: true,
    };
    formData.append(
      "feedPostReq",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    // for (var value of formData.values()) {
    //   console.log(value);
    // }
    allAxios
      .post(`/feed`, formData, { headers: setToken() })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const modifyFeed = (fId: number) => {
    console.log(fId);
  };
  const [file, setFile]: any = useState(null);
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

  const feedDelete = (id: number, userID: number) => {
    if (userId === userID) {
      allAxios
        .delete(`feed/${id}`, { headers: setToken() })
        .then(() => {
          alert("게시물이 삭제되었습니다.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const feedLike = (id: number) => {
    allAxios
      .post(`like/${id}`, "", { headers: setToken() })
      .then(() => {
        setUpdate(update + 1);
      })
      .catch((err) => {
        console.log(err);
      });
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
                return (
                  <div key={i}>
                    <ListItem
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete"></IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <div className="container">
                          <div className="outer">
                            <Image
                              className="profile"
                              src={d.imgUrl}
                              alt="finger image"
                              width="200%"
                              height="200%"
                            ></Image>
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
                      <ListItemText style={{ margin: "30px" }} />
                      <div style={{ width: "100%" }}>
                        <Image
                          className="profile"
                          src={d.imgUrl}
                          alt="finger image"
                          width="70%"
                          height="70%"
                        ></Image>
                        <h5 style={{ margin: "20px", width: "70%" }}>
                          {d.content}
                        </h5>
                        <ThumbUpIcon
                          style={{ margin: "5px", cursor: "pointer" }}
                          onClick={() => {
                            feedLike(d.id);
                          }}
                          color={d.isLike ? "primary" : ""}
                        ></ThumbUpIcon>
                        <EditIcon
                          style={{ margin: "5px", cursor: "pointer" }}
                          onClick={() => {
                            modifyFeed(d.id);
                          }}
                        ></EditIcon>
                        {d.userId === userId ? (
                          <DeleteIcon
                            style={{ margin: "5px", cursor: "pointer" }}
                            onClick={() => {
                              feedDelete(d.id, d.userId);
                            }}
                          />
                        ) : null}

                        <h4>{d.likeCount}</h4>
                      </div>
                    </ListItem>

                    <hr></hr>
                  </div>
                );
              })}
          </List>
        </Grid>
        <Grid item xs={3} />
      </Grid>
      {/* 피드 작성 modal */}
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
      {/* 피드 수정 modal */}
      <Modal show={show2} onHide={handleClose2}>
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
          <Button variant="contained" color="error" onClick={handleClose2}>
            취소
          </Button>
          <div style={{ width: "10px" }}></div>
          <Button variant="contained">저장</Button>
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
