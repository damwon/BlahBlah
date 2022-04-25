import { Grid, Button, Pagination } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
export default function QnA() {
  const router = useRouter();
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Image
            src="/images/notice.PNG"
            alt="notice2 image"
            width="200"
            height="40"
            layout="responsive"
          />
          <br></br>
          <br></br>
          <Grid container spacing={2}>
            <Grid item xs={9}></Grid>
            <Grid item xs={3}>
              <Button
                className="mar"
                variant="contained"
                onClick={() => {
                  router.push(`/qna/write`);
                }}
              >
                문의하기
              </Button>
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
