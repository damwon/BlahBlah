import { Grid, Button } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import allAxios from "../../../lib/allAxios";
import { useState, useEffect } from "react";
export default function Edit() {
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const id = Number(router.query.id);
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
            setContent("내용을 작성해주세요");
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
        router.push(`/note/${id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={2} />
      <Grid item xs={8}>
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
              width="80"
              height="100"
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
        <Grid container spacing={3}>
          <Grid item xs={5} />
          <Grid item xs={4}>
            <Button className="mar" variant="contained" color="error">
              취소
            </Button>
            <Button className="mar" variant="contained" onClick={edit}>
              수정 완료
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={2} />
      </Grid>

      <style jsx>
        {`
          .lb-wrap {
            width: 40%;
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
    </Grid>
  );
}
