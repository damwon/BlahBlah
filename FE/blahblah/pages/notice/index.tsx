// import { Grid, Image, Pagination } from "semantic-ui-react";
import { Grid } from "@mui/material";
import { Image } from "react-bootstrap";
export default function Notice() {
  return (
    <Grid container spacing={3}>
      <Grid item xs>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Image
            className="centered"
            src="/images/notice2.PNG"
            alt="notice image"
          ></Image>
          <br></br>
          <Grid container spacing={3}>
            <Grid item xs>
              <hr></hr>
              <Grid item xs={3} className="text-center text-bold">
                <p>번호</p>
              </Grid>
              <Grid item xs={6} className="text-center text-bold">
                <p>제목</p>
              </Grid>
              <Grid item xs={3} className="text-center text-bold">
                <p>등록일</p>
              </Grid>
              <hr></hr>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} />
      </Grid>
      <style jsx>
        {`
          .text-center {
            text-align: center;
          }
          p {
            font-size: medium;
            font-weight: 800;
          }
        `}
      </style>
    </Grid>
  );
}
