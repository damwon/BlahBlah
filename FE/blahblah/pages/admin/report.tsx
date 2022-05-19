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
import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import allAxios from "../../lib/allAxios";

export default function Report() {
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userLst, setUserLst]: any = useState();

  useEffect(() => {
    allAxios
      .get(`/user`)
      .then((res) => {
        setUserLst(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    allAxios
      .get(`/report`, { headers: setToken() })
      .then((res) => {
        console.log("here!!!", res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
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
              options={userLst && userLst.map((option: any) => option.email)}
              renderInput={(params) => (
                <TextField {...params} label="user-Email" />
              )}
            />
          </Stack>

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
