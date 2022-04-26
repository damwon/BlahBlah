import { Grid, Button } from "@mui/material";
import Image from "next/image";
export default function Write() {
  return (
    <>
      <Grid spacing={3} container direction="row">
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Image
            src="/images/qnaAnswer.PNG"
            alt="qnaAnswer image"
            width="200"
            height="40"
            layout="responsive"
            priority
          />
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <div className="mar-left">
                <h3>제목: 불순한 접근</h3>
              </div>
            </Grid>
            <Grid item xs={3} className="text-center">
              <h3>작성자: 김승환</h3>
            </Grid>
          </Grid>
          <Grid>
            <hr></hr>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <h3>내용</h3>
            </Grid>
            <Grid item xs={8}>
              <p>이러이러한 문제가 있는데 해결 가능?</p>
            </Grid>
            <Grid item xs={2} />
          </Grid>
          <Grid>
            <hr></hr>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <h3>답변</h3>
            </Grid>
            <Grid item xs={8}>
              <textarea
                autoFocus
                style={{
                  minWidth: "100%",
                  minHeight: "30vh",
                }}
                className="clean-textarea"
                placeholder="안녕하세요. BlahBlah 운영진입니다."
              ></textarea>
            </Grid>
            <Grid item xs={2} />
          </Grid>
          <Grid>
            <div className="m">
              <Button variant="contained" disabled>
                취소
              </Button>{" "}
              <Button variant="contained">작성</Button>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={2} />
      </Grid>
      <style jsx>{`
        .mar-left{
          margin-left:100px;
        }
        .m {
          width: 200px;
          margin: 0 auto;
        }
        }
      `}</style>
    </>
  );
}
