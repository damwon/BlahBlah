import { Grid, Button } from "@mui/material";
export default function QnaWrite() {
  return (
    <Grid container spacing={3}>
      <Grid xs={2} />
      <Grid xs={8}>
        <img
          src="/images/notice.PNG"
          alt="notice2 image"
          className="img-fluid"
          width="100%"
        ></img>
        <Grid container spacing={2}>
          <Grid xs={3}>
            <h3 className="text-center">제목</h3>
          </Grid>
          <Grid xs={9}>
            <textarea
              placeholder="제목을 입력해주세요."
              style={{ width: "80%" }}
            />
          </Grid>
        </Grid>
        <br></br>
        <Grid container spacing={2}>
          <Grid xs={3}>
            <h3 className="text-center">문의 내용</h3>
          </Grid>
          <Grid xs={9}>
            <textarea
              placeholder="문의 내용을 작성해주세요"
              style={{ minHeight: 300, width: "80%" }}
            />
          </Grid>
        </Grid>
        <br></br>
        <br></br>
        <Grid container spacing={2}>
          <Grid xs={5}></Grid>
          <Grid xs={7}>
            <Button variant="contained" disabled>
              취소
            </Button>
            <Button variant="contained">작성</Button>
          </Grid>
        </Grid>

        <Grid item xs={2} />
      </Grid>
      <style jsx>{``}</style>
    </Grid>
  );
}
