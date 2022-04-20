import { Grid, Button } from "@mui/material";
import { Image } from "react-bootstrap";
export default function QnaWrite() {
  return (
    <Grid container spacing={3}>
      <Grid xs={2} />
      <Grid xs={8}>
        <Image
          className="centered"
          src="/images/notice.PNG"
          alt="notice2 image"
        ></Image>
        <h3>제목</h3>
        <textarea placeholder="제목을 입력해주세요." />
        <h3>제목</h3>
        <textarea
          placeholder="문의 내용을 작성해주세요"
          style={{ minHeight: 300 }}
        />
        <div>
          <br></br>
          <Button>취소</Button>
          <Button>작성</Button>
        </div>
        <Grid item xs={2} />
      </Grid>
      <style jsx>
        {`
          .test {
            width: 400px;
          }
        `}
      </style>
    </Grid>
  );
}
