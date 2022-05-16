import { Grid, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import allAxios from "../../../lib/allAxios";

export default function Note() {
  const router = useRouter();
  const id = Number(router.query.id);

  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
            />
          </div>
          <div className="lb-text">
            <h2>{title}</h2>
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
            />
          </div>
          <div className="lb-text">
            <h3>{content}</h3>
          </div>
        </div>
        <div className="m">
          <Button
            variant="contained"
            style={{ backgroundColor: "grey" }}
            onClick={() => {
              router.push(`/study`);
            }}
          >
            Back
          </Button>{" "}
          <Button
            style={{
              backgroundColor: "#00ccb1",
            }}
            variant="contained"
            onClick={() => {
              router.push(`/note/${id}/edit/`);
            }}
          >
            Edit
          </Button>
        </div>
      </Grid>

      <style jsx>
        {`
          .m {
            width: 142px;
            margin: 0 auto;
          }
          .lb-wrap {
            width: 40%;
            margin: 10px auto;
            position: relative;
          }
          .lb-text {
            padding: 5px 10px;
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
          h2 {
            font-size: 1.5vw;
            color: rgb(97, 17, 70);
          }
          h3 {
            font-size: min(1vw, 1.5vh);
            color: rgb(97, 17, 70);
          }
        `}
      </style>
    </Grid>
  );
}
