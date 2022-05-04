import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import allAxios from "../../lib/allAxios";
import { useRouter } from "next/router";

export default function Admin() {
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };
  const router = useRouter();
  useEffect(() => {
    allAxios
      .get(`/user/check-authority`, { headers: setToken() })
      .then((res) => {
        if (res.data != "admin") {
          router.push(`/`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
          <p
            style={{ cursor: "pointer" }}
            onClick={() => {
              router.push("/admin/report");
            }}
          >
            1. 유저 검색이 가능한 신고 접수창
          </p>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => {
              router.push("/admin/answer");
            }}
          >
            2. 1:1 문의 확인창
          </p>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => {
              router.push("/admin/answer/write");
            }}
          >
            3. 1:1 문의 답변창
          </p>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => {
              router.push("/notice");
            }}
          >
            4. 공지사항 리스트
          </p>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => {
              router.push("/admin/notice/write");
            }}
          >
            5. 공지사항 작성창
          </p>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </>
  );
}
