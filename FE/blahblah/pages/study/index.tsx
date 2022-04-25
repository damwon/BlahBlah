import { Grid, Pagination } from "@mui/material";

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
          <img
            src="/images/study.PNG"
            className="img-fluid"
            alt="study image"
            width="100%"
          ></img>
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
