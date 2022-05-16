import { Grid } from "@mui/material";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";
// components
import Wordnote from "../../component/study/wordnote";
import Mynote from "../../component/study/mynote";
import Recordnote from "../../component/study/recorenote";
export default function Study() {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("jwt") === null) {
      alert("로그인 후 사용해주세요.");
      router.push(`/user/login`);
    }
  });
  return (
    <>
      <Grid spacing={3} container>
        <Grid item xs={2} />
        <Grid item xs={8}>
          {/* <Image
            priority
            src="/images/study.PNG"
            alt="study image"
            width="200"
            height="40"
            layout="responsive"
          /> */}
          <br></br>
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
