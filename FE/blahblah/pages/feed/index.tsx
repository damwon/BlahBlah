import { useEffect, useState } from "react";
import $ from "jquery";
import {
  Button,
  Grid,
  List,
  ListItem,
  IconButton,
  ListItemAvatar,
  ListItemText,
  Checkbox,
} from "@mui/material";
import { Modal } from "react-bootstrap";
import { Image } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import EditIcon from "@mui/icons-material/Edit";
import allAxios from "../../lib/allAxios";
import { useRouter } from "next/router";
export default function Index() {
  const router = useRouter();
  const [update, setUpdate] = useState(1);
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };

  useEffect(() => {
    if (localStorage.getItem("jwt") === null) {
      alert("로그인 후 사용해주세요.");
      router.push(`/`);
    }
  });
  const [showFeeds, setShowFeeds]: any = useState();
  const [feeds, setFeeds]: any = useState();
  useEffect(() => {
    allAxios
      .get(`/feed`, { headers: setToken() })
      .then((res) => {
        setFeeds(res.data);
        return res;
      })
      .then((res) => {
        if (btnColor === "primary") {
          setShowFeeds(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update]);

  const [friendFeeds, setFriendFeeds]: any = useState();
  useEffect(() => {
    allAxios
      .get(`/feed/friends`, { headers: setToken() })
      .then((res) => {
        setFriendFeeds(res.data);
        return res;
      })
      .then((res) => {
        if (btnColor !== "primary") {
          setShowFeeds(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update]);

  useEffect(() => {
    if (showFeeds) {
    }
  }, [showFeeds]);
  useEffect(() => {
    allAxios
      .get(`/feed`, { headers: setToken() })
      .then((res) => {
        setShowFeeds(res.data);
        const tmpArr: any = [];
        for (let i = 0; i < res.data.length; i++) {
          tmpArr.push({ display: "none" });
        }
        setMyStyle(tmpArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setFile();
    setOpen(true);
  };
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const [feedContent, setFeedContent] = useState();
  const [changeIdx, setChangeIdx] = useState();
  const handleShow2 = (idx: number) => {
    setShow2(true);
    allAxios
      .get(`feed/${idx}`)
      .then((res) => {
        setFeedContent(res.data.content);
        setChangeIdx(res.data.id);
      })
      .catch((err) => console.log(err));
  };
  const contentChange = (e: any) => {
    const val = e.target.value;
    setFeedContent(val);
  };

  const modifyFeed = () => {
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
      content: feedContent,
      open: open,
    };
    formData.append(
      "feedPostReq",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    allAxios
      .put(`/feed/${changeIdx}`, formData, { headers: setToken() })
      .then(() => {
        alert("피드를 수정했습니다.");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [dense, setDense] = useState(false);
  const [content, setContent]: any = useState();
  const [open, setOpen] = useState(true);
  const writeFeed = () => {
    if (content) {
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
        open: open,
      };
      formData.append(
        "feedPostReq",
        new Blob([JSON.stringify(data)], { type: "application/json" })
      );
      allAxios
        .post(`/feed`, formData, { headers: setToken() })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("내용을 입력해주세요");
    }
  };

  const [file, setFile]: any = useState(null);
  const handleFile = (e: any) => {
    const imgFile = e.target.files[0];
    setFile(imgFile);
  };

  const [btnColor, setBtnColor] = useState("primary");
  const [btnName, setBtnName] = useState("피드 전체 보기");
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

  const commentDelete = (id: number, userID: number) => {
    if (userId === userID) {
      allAxios
        .delete(`comment/${id}`, { headers: setToken() })
        .then(() => {
          alert("댓글이 삭제되었습니다.");
        })
        .catch((err) => {
          console.log(err);
        });
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

  const [comment, setComment]: any = useState();
  const writeComment = (fId: number) => {
    if (comment) {
      allAxios
        .post(
          `comment/${fId}`,
          {
            content: comment,
          },
          { headers: setToken() }
        )
        .then(() => {
          setUpdate(update + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("댓글에 내용을 입력해주세요.");
    }
  };

  const showComments = (i: number) => {
    setUpdate(update + 1);
    const tmpStyle: any = myStyle;
    tmpStyle[i] = null;
    setMyStyle(tmpStyle);
  };

  const closeComments = (i: number) => {
    setUpdate(update + 1);
    const tmpStyle: any = myStyle;
    tmpStyle[i] = { display: "none" };
    setMyStyle(tmpStyle);
  };
  const [myStyle, setMyStyle] = useState();
  const inputNull = (i: number) => {
    $(`#${i}`).val("");
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
              showFeeds.map((d: any, i: any) => {
                console.log(d);
                return (
                  <div key={i}>
                    <ListItem
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete"></IconButton>
                      }
                    >
                      <ListItemAvatar
                        style={{ marginTop: "30px", marginBottom: "auto" }}
                      >
                        <div className="container">
                          <div className="outer">
                            <Image
                              className="profile"
                              src={d.userProfile}
                              alt="finger image"
                              width="200%"
                              height="200%"
                            ></Image>

                            <div className="innerRB"></div>
                          </div>
                        </div>
                      </ListItemAvatar>
                      <ListItemText style={{ margin: "30px" }} />
                      <div style={{ width: "100%" }}>
                        {d.imgUrl ? (
                          <Image
                            className="profile"
                            src={d.imgUrl}
                            alt="finger image"
                            width="70%"
                            height="70%"
                          ></Image>
                        ) : null}

                        <h5 style={{ margin: "20px", width: "70%" }}>
                          {d.content}
                        </h5>

                        <hr></hr>

                        <ThumbUpIcon
                          style={{ margin: "5px", cursor: "pointer" }}
                          onClick={() => {
                            feedLike(d.id);
                          }}
                          color={d.isLike ? "primary" : ""}
                        ></ThumbUpIcon>

                        {d.userId === userId ? (
                          <EditIcon
                            color="primary"
                            style={{ margin: "5px", cursor: "pointer" }}
                            onClick={() => {
                              handleShow2(d.id);
                            }}
                          ></EditIcon>
                        ) : null}
                        {d.userId === userId ? (
                          <DeleteIcon
                            color="error"
                            style={{ margin: "5px", cursor: "pointer" }}
                            onClick={() => {
                              feedDelete(d.id, d.userId);
                            }}
                          />
                        ) : null}
                        <h4>{d.likeCount}</h4>

                        <hr></hr>

                        {d.comments.length > 0 && myStyle
                          ? d.comments.map((d1: any, i1: number) => {
                              if (i1 < 3) {
                                return (
                                  <div key={i1}>
                                    <span>
                                      {d1.userName}: {d1.content}
                                    </span>
                                    {d1.userId === userId ? (
                                      <DeleteIcon
                                        color="error"
                                        style={{
                                          margin: "5px",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          commentDelete(d1.id, d1.userId);
                                        }}
                                      />
                                    ) : null}
                                  </div>
                                );
                              } else {
                                return (
                                  <div style={myStyle[i]} key={i1}>
                                    <span>
                                      {d1.userName}: {d1.content}
                                    </span>
                                    {d1.userId === userId ? (
                                      <DeleteIcon
                                        color="error"
                                        style={{
                                          margin: "5px",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          commentDelete(d1.id, d1.userId);
                                        }}
                                      />
                                    ) : null}
                                  </div>
                                );
                              }
                            })
                          : [0].map((f: any, k: number) => {
                              return <h5 key={k}>첫 댓글을 작성해보세요.</h5>;
                            })}
                        {myStyle && myStyle[i] ? (
                          [0].map((d2: any, i2: number) => {
                            if (d.comments.length > 3) {
                              return (
                                <div key={i2}>
                                  <Button
                                    variant="contained"
                                    onClick={() => {
                                      showComments(i);
                                    }}
                                    size="small"
                                  >
                                    더보기
                                  </Button>
                                </div>
                              );
                            } else if (myStyle[i] === null) {
                              return (
                                <Button
                                  key={i2}
                                  variant="contained"
                                  onClick={() => {
                                    closeComments(i);
                                  }}
                                  size="small"
                                >
                                  접기
                                </Button>
                              );
                            }
                          })
                        ) : (
                          <Button
                            variant="contained"
                            onClick={() => {
                              closeComments(i);
                            }}
                            size="small"
                          >
                            접기
                          </Button>
                        )}

                        <div>
                          <input
                            id={i}
                            style={{ width: "70%", margin: "10px" }}
                            onChange={(e) => {
                              setComment(e.target.value);
                            }}
                          ></input>
                          <Button
                            variant="contained"
                            onClick={() => {
                              writeComment(d.id);
                              inputNull(i);
                              if (d.comments.length > 2) {
                                showComments(i);
                              }
                            }}
                          >
                            작성
                          </Button>
                        </div>
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
              <textarea
                style={{ minHeight: 200, width: "90%" }}
                onChange={(e: any) => {
                  setContent(e.target.value);
                }}
              ></textarea>
            </Grid>
          </Grid>
          <input type="file" name="file" onChange={(e) => handleFile(e)} />
          <span>피드 공개여부</span>
          <Checkbox
            onClick={() => {
              if (open) {
                setOpen(false);
              } else {
                setOpen(true);
              }
            }}
            defaultChecked
          />
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
          <Modal.Title>피드 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid spacing={2} container>
            <Grid item xs={2}>
              <h4>내용</h4>
            </Grid>
            <Grid item xs={10}>
              <textarea
                style={{ minHeight: 200, width: "90%" }}
                onChange={contentChange}
                value={feedContent}
              ></textarea>
            </Grid>
          </Grid>
          <input type="file" name="file" onChange={(e) => handleFile(e)} />
          <span>피드 공개여부</span>
          <Checkbox
            onClick={() => {
              if (open) {
                setOpen(false);
              } else {
                setOpen(true);
              }
            }}
            defaultChecked
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" color="error" onClick={handleClose2}>
            취소
          </Button>
          <div style={{ width: "10px" }}></div>
          <Button variant="contained" onClick={modifyFeed}>
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

           {
            /* .innerLT {
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
          } */
          }
          .innerRB {
            background-color: rgb(130, 219, 78);
            width: 30px;
            height: 30px;
            border-radius: 50%;
            position: absolute;
            bottom: 20px;
            right: 20px;
          }

          .inner:hover {
            background-color: #5555ff;
          }
        `}
      </style>
    </>
  );
}
