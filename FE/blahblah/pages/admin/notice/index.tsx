import { Grid, Pagination } from "@mui/material";
import Image from "next/image";
export default function Notice() {
  return (
    <>
      <Grid spacing={3} container direction="row">
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Image
            src="/images/writeNotice.PNG"
            alt="writeNotice image"
            width="200"
            height="40"
            layout="responsive"
            priority
          />

          <div className="m">
            <Pagination count={10} variant="outlined" shape="rounded" />
          </div>
        </Grid>
        <Grid item xs={2} />
      </Grid>
      <style jsx>
        {`
          .m {
            width: 400px;
            margin: 0 auto;
          }
        `}
      </style>
    </>
  );
}
