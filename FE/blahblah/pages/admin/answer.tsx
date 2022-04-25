import { Grid } from "@mui/material";
export default function Answer() {
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
        <Grid item xs={8}></Grid>
        <Grid item xs={2} />
      </Grid>
    </>
  );
}
