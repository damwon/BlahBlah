import { Grid, Button } from "@mui/material";
import { Image } from "react-bootstrap";

export default function QnA() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs>
          <Grid item xs={2} />
          <Grid item xs={8}>
            <Image
              className="centered"
              src="/images/notice.PNG"
              alt="notice2 image"
            ></Image>
            <br></br>
            <br></br>
            <Grid item spacing={2}>
              <Grid item xs>
                <Grid item xs={4}></Grid>
                <Grid item xs={8}>
                  <Button>문의하기</Button>
                </Grid>
              </Grid>

              <div></div>
            </Grid>
          </Grid>

          <Grid item xs={2} />
        </Grid>
      </Grid>
    </>
  );
}
