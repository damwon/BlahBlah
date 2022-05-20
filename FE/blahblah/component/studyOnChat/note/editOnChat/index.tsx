import { Grid, Button } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import allAxios from "../../../../lib/allAxios";
import { useState, useEffect } from "react";
export default function EditOnChat(props: any) {
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };
  const [update, setUpdate] = useState(1);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const id = props.noteId;
  useEffect(() => {
    if (String(id) != "NaN") {
      allAxios
        .get(`/memo/${id}`, {
          headers: setToken(),
        })
        .then((res) => {
          setTitle(res.data.title);
          const tmpContent = res.data.content;
          if (tmpContent != null) {
            setContent(tmpContent);
          } else {
            setContent("Write your memo");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  const titleChange = (e: any) => {
    const val = e.target.value;
    setTitle(val);
  };
  const contentChange = (e: any) => {
    const val = e.target.value;
    setContent(val);
  };

  const edit = () => {
    allAxios
      .put(
        `/memo/${id}`,
        {
          content: content,
          title: title,
        },
        { headers: setToken() }
      )
      .then(() => {
        props.handleTF(2, id);
        // window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="lb-wrap">
        <div className="lb-image">
          <Image
            priority
            src="/images/noteTitle.png"
            alt="noteTitle image"
            width="200"
            height="40"
            layout="responsive"
          ></Image>
        </div>
        <div className="lb-text">
          <input
            type="text"
            className="my-title"
            style={{ minWidth: "15vw", minHeight: "5vh" }}
            value={title}
            onChange={titleChange}
          ></input>
        </div>
      </div>

      <div className="lb-wrap">
        <div className="lb-image">
          <Image
            priority
            src="/images/note.jpg"
            alt="note image"
            width="200vw"
            height="200vh"
            layout="responsive"
          ></Image>
        </div>
        <div className="lb-text">
          <textarea
            autoFocus
            style={{
              minWidth: "13vw",
              minHeight: "30vh",
              maxHeight: "30vh",
            }}
            className="clean-textarea"
            value={content}
            onChange={contentChange}
          ></textarea>
        </div>
      </div>
      <div style={{ width: "167px", margin: "auto" }}>
        <Button
          variant="contained"
          color="error"
          onClick={() => props.handleTF(2, id)}
        >
          cancel
        </Button>{" "}
        <Button
          style={{
            backgroundColor: "#00ccb1",
          }}
          variant="contained"
          onClick={edit}
        >
          Save
        </Button>
      </div>

      <style jsx>
        {`
          .lb-wrap {
            width: 100%;
            margin: 10px auto;
            position: relative;
          }
          .lb-text {
            padding: 5px 10px;
            text-align: center;
            z-index: 1;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .lb-wrap img {
            width: 100%;
            vertical-align: middle;
          }
          .clean-textarea {
            border: none;
            resize: none;
            font-size: min(1vw, 1.5vh);
            font-weight: 500;
            color: rgb(97, 17, 70);
          }
          .clean-textarea::placeholder {
            font-size: min(1vw, 1.5vh);
            font-weight: 500;
            color: rgb(97, 17, 70);
          }
          .my-title::placeholder {
            color: rgb(97, 17, 70);
            font-weight: 500;
            font-size: 1.2vw;
          }
          .my-title {
            color: rgb(97, 17, 70);
            font-weight: 500;
            font-size: 1.2vw;
          }
        `}
      </style>
    </>
  );
}
