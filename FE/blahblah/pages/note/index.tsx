import { Grid, Button } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
export default function Note() {
  const router = useRouter();
  return (
    <Grid container spacing={3}>
      <Grid item xs={2} />
      <Grid item xs={8}>
        <div className="lb-wrap">
          <div className="lb-image">
            <Image
              src="/images/noteTitle.png"
              alt="noteTitle image"
              width="200"
              height="40"
              layout="responsive"
            />
          </div>
          <div className="lb-text">
            <h2>Title: my Note</h2>
          </div>
        </div>

        <div className="lb-wrap">
          <div className="lb-image">
            <Image
              src="/images/note.jpg"
              alt="note image"
              width="80"
              height="100"
              layout="responsive"
            />
          </div>
          <div className="lb-text">
            <h3>
              내용 적는중 어떻게 나오려나내용 적는중 어떻게 나오려나내용 적는중
              어떻게 나오려나내용 적는중 어떻게 나오려나내용 적는중 어떻게
              나오려나 내용 적는중 어떻게 나오려나내용 적는중 어떻게
              나오려나내용 적는중 어떻게 나오려나
            </h3>
          </div>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={5} />
          <Grid item xs={4}>
            <Button className="mar" variant="contained" disabled>
              취소
            </Button>
            <Button
              className="mar"
              variant="contained"
              onClick={() => {
                router.push(`/note/edit`);
              }}
            >
              수정
            </Button>
          </Grid>
        </Grid>
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
          .mar {
            margin: 10px;
          }
        `}
      </style>
    </Grid>
  );
}
