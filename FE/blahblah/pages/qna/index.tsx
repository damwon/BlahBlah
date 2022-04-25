import { Grid, Button, Pagination } from "@mui/material";
import Image from "next/image";

export default function QnA() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Image
            src="/images/notice.PNG"
            alt="notice2 image"
            width="100%"
            height="100%"
          />
          {/* <img
            src="/images/notice.PNG"
            alt="notice2 image"
            className="img-fluid"
            width="100%"
          ></img> */}
          <br></br>
          <br></br>
          <Grid container spacing={2}>
            <Grid item xs={9}></Grid>
            <Grid item xs={3}>
              <Button>문의하기</Button>
            </Grid>
            <div className="m">
              <Pagination count={10} variant="outlined" shape="rounded" />
            </div>
          </Grid>

          <Grid item xs={2} />
        </Grid>
      </Grid>
      <style jsx>
        {`
          .m {
            margin: 0 auto;
          }
        `}
      </style>
    </>
  );
}
