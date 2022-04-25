import { Grid, Pagination } from "@mui/material";
import Image from "next/image";
export default function Notice() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={2} />
      <Grid item xs={8}>
        <Image
          src="/images/notice2.PNG"
          alt="notice image"
          width="240"
          height="40"
          layout="responsive"
        />
        <br></br>
        <Grid container spacing={3}>
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
          <div className="m">
            <Pagination count={10} variant="outlined" shape="rounded" />
          </div>
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
          .m {
            margin: 0 auto;
          }
        `}
      </style>
    </Grid>
  );
}
