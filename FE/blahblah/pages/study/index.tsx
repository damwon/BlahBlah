import { Grid, Pagination, Button } from "@mui/material";
import Image from "next/image";
// components
import Wordnote from "../../component/study/wordnote";
import Mynote from "../../component/study/mynote";
import Recordnote from "../../component/study/recorenote";
export default function Study() {
  return (
    <>
      <Grid spacing={3} container>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Image
            priority
            src="/images/study.PNG"
            alt="study image"
            width="200"
            height="40"
            layout="responsive"
          />
          <Grid spacing={3} container>
            <Grid item xs={4}>
              <Wordnote></Wordnote>
            </Grid>
            <Grid item xs={4}>
              <Recordnote></Recordnote>
            </Grid>
            <Grid item xs={4}>
              <Mynote></Mynote>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} />
      </Grid>

      <style jsx>{``}</style>
    </>
  );
}
