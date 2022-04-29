import {
  Grid,
  Stack,
  Autocomplete,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function Report() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userList = [
    { userMail: "ljj9316@naver.com", name: "종준" },
    { userMail: "jodie9596@gmail.com", name: "승환" },
    { userMail: "qs2720@naver.com", name: "성건" },
    { userMail: "flykimjiwon@kakao.com", name: "지원" },
    { userMail: "joali9807@naver.com", name: "재현" },
    { userMail: "dsw00513@naver.com", name: "근태" },
  ];

  // Modal
  const [punish, setPunish] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setPunish(event.target.value as string);
  };
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
          <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
              options={userList.map((option) => option.userMail)}
              renderInput={(params) => (
                <TextField {...params} label="user-Email" />
              )}
            />
          </Stack>
          <Image
            src="/images/accuse.PNG"
            alt="report image"
            width="200"
            height="40"
            layout="responsive"
          />

          <Button variant="primary" onClick={handleShow} className="mar-auto">
            신고 접수
          </Button>
        </Grid>

        <Grid item xs={2} />
      </Grid>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>제목: 불순한 접근</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              신고 내용
            </Grid>
            <Grid item xs={9}>
              <p>
                언어 교환이 아니라 데이팅 목적으로 자꾸 저에게 메세지를
                보냅니다. 차단을 해도 새로 아이디를 만들어서 접근하고 있습니다.
              </p>
              <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
                <InputLabel id="demo-simple-select-label">Punish</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={punish}
                  label="punish"
                  onChange={handleChange}
                >
                  <MenuItem value={7}>7일 정지</MenuItem>
                  <MenuItem value={30}>30일 정지</MenuItem>
                  <MenuItem value={0}>영구 정지</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" onClick={handleClose}>
            처리완료
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
