import Grid from "@mui/material/Grid";

export default function Admin() {
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
          <h1>관리자 페이지</h1>
          <h2>기능</h2>
          <p>1. 유저 검색이 가능한 신고 접수창</p>
          <p>2. 1:1 문의 확인창</p>
          <p>3. 1:1 문의 답변창</p>
          <p>4. 공지사항 작성창</p>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </>
  );
}
