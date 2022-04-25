import { Grid, Pagination } from "@mui/material";
import Image from "next/image";
export default function Study() {
  return (
    <>
      <Grid
        spacing={3}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Image
            src="/images/study.PNG"
            alt="study image"
            width="200"
            height="40"
            layout="responsive"
          />
          <Grid
            spacing={3}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            className="cent"
          >
            <Grid item xs={4}>
              <h1 className="cent">word note</h1>
              <Pagination count={10} variant="outlined" shape="rounded" />
            </Grid>
            <Grid item xs={4}>
              <h1 className="cent">record note</h1>
              <Pagination count={10} variant="outlined" shape="rounded" />
            </Grid>
            <Grid item xs={4}>
              <h1 className="cent">my note</h1>
              <Pagination count={10} variant="outlined" shape="rounded" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} />
      </Grid>

      <style jsx>
        {`
          .cent {
            text-align: center;
          }
        `}
      </style>
    </>
  );
}
