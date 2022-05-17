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
import Swal from "sweetalert2";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CreateIcon from "@mui/icons-material/Create";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
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
      Swal.fire({
        title: "you need to login first.",
        confirmButtonColor: "#00ccb1",
      });
      router.push(`/user/login`);
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
        Swal.fire({
          title: "the feed is modified",
          confirmButtonColor: "#00ccb1",
        });
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
      Swal.fire({
        title: "please write contents",
        confirmButtonColor: "#00ccb1",
      });
    }
  };

  const [file, setFile]: any = useState(null);
  const handleFile = (e: any) => {
    const imgFile = e.target.files[0];
    setFile(imgFile);
  };

  const [btnColor, setBtnColor] = useState("primary");
  const [btnName, setBtnName] = useState("Show All Feed");
  const btnChange = () => {
    if (btnColor === "primary") {
      setBtnColor("success");
      setBtnName("Show Follower's Feed");
      setShowFeeds(friendFeeds);
    } else {
      setBtnColor("primary");
      setBtnName("Show All Feed");
      setShowFeeds(feeds);
    }
  };

  const commentDelete = (id: number, userID: number) => {
    if (userId === userID) {
      allAxios
        .delete(`comment/${id}`, { headers: setToken() })
        .then(() => {
          Swal.fire({
            title: "the comment is deleted",
            confirmButtonColor: "#00ccb1",
          });
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
          Swal.fire({
            title: "the feed is deleted",
            confirmButtonColor: "#00ccb1",
          });
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
      Swal.fire({
        title: "please write contents",
        confirmButtonColor: "#00ccb1",
      });
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
              style={{
                backgroundColor: "#00ccb1",
                width: 150,
              }}
              variant="contained"
              color="primary"
              size="small"
              onClick={handleShow}
            >
              <CreateIcon style={{ marginRight: "10px" }}></CreateIcon>
              Write Feed
            </Button>
            <span style={{ margin: "10px" }}></span>
            <Button
              style={{
                backgroundColor: "#00ccb1",
                width: 230,
              }}
              variant="contained"
              color={btnColor === "primary" ? "primary" : "secondary"}
              size="small"
              onClick={btnChange}
            >
              <ChangeCircleIcon
                style={{ marginRight: "10px" }}
              ></ChangeCircleIcon>
              {btnName}
            </Button>
          </div>
          <br></br>
          <List dense={dense}>
            {showFeeds &&
              showFeeds.map((d: any, i: any) => {
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
                        <div
                          className="container"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            router.push(
                              {
                                pathname: `/user/detail/`,
                                query: {
                                  email: d.email,
                                },
                              },
                              `/user/detail/`
                            );
                          }}
                        >
                          <div className="outer">
                            <Image
                              src={d.userProfile}
                              alt=" "
                              width="100%"
                              height="100%"
                            ></Image>
                          </div>
                        </div>
                      </ListItemAvatar>
                      <ListItemText style={{ margin: "30px" }} />
                      <div style={{ width: "100%" }}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <span
                              style={{ fontSize: "20px", marginRight: "10px" }}
                            >
                              {d.userName}
                            </span>
                            {d.userId !== userId ? (
                              <Button
                                onClick={() => {
                                  router.push(
                                    {
                                      pathname: "/chat",
                                      query: {
                                        name: d.userName,
                                        userId: d.userId,
                                      },
                                    },
                                    `/chat`
                                  );
                                }}
                                size="small"
                                style={{ backgroundColor: "#00ccb1" }}
                                variant="contained"
                              >
                                <ChatBubbleOutlineIcon
                                  style={{ margin: "0 5px", display: "inline" }}
                                ></ChatBubbleOutlineIcon>
                                Chat
                              </Button>
                            ) : null}
                          </Grid>
                          <Grid item xs={6}>
                            <h6 style={{ textAlign: "right" }}>
                              {d.createdAt.substr(0, 10)}
                            </h6>
                          </Grid>
                        </Grid>

                        {d.imgUrl ? (
                          <div>
                            <br></br>
                            <Image
                              src={d.imgUrl}
                              alt="finger image"
                              width="70%"
                              height="70%"
                            ></Image>
                          </div>
                        ) : null}

                        <h6 style={{ margin: "20px 0px", width: "70%" }}>
                          {d.content}
                        </h6>

                        <ThumbUpIcon
                          style={{ margin: "5px", cursor: "pointer" }}
                          onClick={() => {
                            feedLike(d.id);
                          }}
                          color={d.isLike ? "primary" : "disabled"}
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
                              console.log(d1);
                              if (i1 < 3) {
                                return (
                                  <div
                                    key={i1}
                                    style={{
                                      marginTop: "5px",
                                    }}
                                  >
                                    <Grid container spacing={2}>
                                      <Grid item xs={1}>
                                        <div
                                          className="miniouter"
                                          onClick={() => {
                                            router.push(
                                              {
                                                pathname: `/user/detail/`,
                                                query: {
                                                  email: d1.email,
                                                },
                                              },
                                              `/user/detail/`
                                            );
                                          }}
                                        >
                                          <Image
                                            style={{
                                              cursor: "pointer",
                                            }}
                                            src={d1.userProfile}
                                            alt=" "
                                            width="30px"
                                            height="30px"
                                          ></Image>
                                        </div>
                                      </Grid>
                                      <Grid item xs={11}>
                                        {d1.userName}: {d1.content}
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
                                      </Grid>
                                    </Grid>
                                    <div style={{ display: "inline" }}></div>
                                  </div>
                                );
                              } else {
                                return (
                                  <div style={myStyle[i]} key={i1}>
                                    <Grid container spacing={2}>
                                      <Grid item xs={1}>
                                        <div
                                          className="miniouter"
                                          style={{
                                            marginTop: "5px",
                                          }}
                                          onClick={() => {
                                            router.push(
                                              {
                                                pathname: `/user/detail/`,
                                                query: {
                                                  email: d1.email,
                                                },
                                              },
                                              `/user/detail/`
                                            );
                                          }}
                                        >
                                          <Image
                                            style={{
                                              cursor: "pointer",
                                            }}
                                            src={d1.userProfile}
                                            alt=" "
                                            width="30px"
                                            height="30px"
                                          ></Image>
                                        </div>
                                      </Grid>
                                      <Grid item xs={11}>
                                        {d1.userName}: {d1.content}
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
                                      </Grid>
                                    </Grid>
                                  </div>
                                );
                              }
                            })
                          : [0].map((f: any, k: number) => {
                              return <h6 key={k}>첫 댓글을 작성해보세요.</h6>;
                            })}
                        {myStyle && myStyle[i] ? (
                          [0].map((d2: any, i2: number) => {
                            if (d.comments.length > 3) {
                              return (
                                <div key={i2}>
                                  <Button
                                    style={{
                                      backgroundColor: "#00ccb1",
                                      margin: "10px 0",
                                    }}
                                    variant="contained"
                                    onClick={() => {
                                      showComments(i);
                                    }}
                                    size="small"
                                  >
                                    <ArrowDropDownIcon
                                      style={{ marginRight: "10px" }}
                                    ></ArrowDropDownIcon>
                                    Open Comments
                                  </Button>
                                </div>
                              );
                            } else if (myStyle[i] === null) {
                              return (
                                <Button
                                  key={i2}
                                  style={{
                                    backgroundColor: "#00ccb1",
                                    margin: "10px 0",
                                  }}
                                  variant="contained"
                                  onClick={() => {
                                    closeComments(i);
                                  }}
                                  size="small"
                                >
                                  <ArrowDropUpIcon
                                    style={{ marginRight: "10px" }}
                                  ></ArrowDropUpIcon>
                                  Close Comments
                                </Button>
                              );
                            }
                          })
                        ) : (
                          <Button
                            style={{
                              backgroundColor: "#00ccb1",
                              margin: "10px 0",
                            }}
                            variant="contained"
                            onClick={() => {
                              closeComments(i);
                            }}
                            size="small"
                          >
                            <ArrowDropUpIcon
                              style={{ marginRight: "10px" }}
                            ></ArrowDropUpIcon>
                            Close Comments
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
                            style={{
                              backgroundColor: "#00ccb1",
                            }}
                            variant="contained"
                            onClick={() => {
                              writeComment(d.id);
                              inputNull(i);
                              if (d.comments.length > 2) {
                                showComments(i);
                              }
                            }}
                          >
                            write
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
          <Modal.Title>Write your Feed.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid spacing={2} container>
            <Grid item xs={2}>
              <h6>Content</h6>
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
          <span>Feed Open All</span>
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
          <Button
            style={{}}
            variant="contained"
            color="error"
            onClick={handleClose}
          >
            cancel
          </Button>
          <div style={{ width: "10px" }}></div>
          <Button
            style={{
              backgroundColor: "#00ccb1",
            }}
            variant="contained"
            onClick={writeFeed}
          >
            save
          </Button>
        </Modal.Footer>
      </Modal>
      {/* 피드 수정 modal */}
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Feed Rewrite</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid spacing={2} container>
            <Grid item xs={2}>
              <h6>Content</h6>
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
          <span>Feed Open All</span>
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
            cancel
          </Button>
          <div style={{ width: "10px" }}></div>
          <Button variant="contained" onClick={modifyFeed}>
            save
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
            border-radius: 50%;
            position: relative;
            overflow: hidden;
          }
          .miniouter {
            width: 30px !important;
            height: 30px !important;
            max-width: 50px !important; /* any size */
            max-height: 50px !important; /* any size */
            margin: auto;
            border-radius: 50%;
            position: relative;
            overflow: hidden;
          }
          }

          .inner:hover {
            background-color: #5555ff;
          }
        `}
      </style>
    </>
  );
}
