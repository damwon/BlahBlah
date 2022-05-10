/* eslint-disable */
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
} from "@mui/material";
import axios from "axios";

export default function VoiceSaveDialog(props: any) {
  const [voiceTitle, setVoiceTitle] = useState("");
  const handleChangeVoiceTitle = (e: any) => {
    setVoiceTitle(e.target.value);
  };
  const [recorderList, setRecorderList] = useState<any>();
  useEffect(() => {
    const setToken = () => {
      const token = localStorage.getItem("jwt");
      const config = {
        Authorization: `Bearer ${token}`,
      };
      return config;
    };
    axios({
      url: "https://blahblah.community:8443/api/recordbook",
      method: "get",
      headers: setToken(),
    })
      .then((res) => {
        console.log(res.data);
        setRecorderList(res.data.recordbookListRes);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Dialog open={props.openVoiceSave} onClose={props.handleCloseVoiceSave}>
      <DialogTitle>음성메시지 저장</DialogTitle>
      <DialogContent>
        <DialogContentText>
          폴더를 선택하시고 음성메시지의 제목을 입력하신 뒤 하단 저장 버튼을
          눌러주세요.
        </DialogContentText>
        <DialogContentText>{props.voiceMsgUrl}</DialogContentText>
        <DialogContentText>{voiceTitle}</DialogContentText>
        <List sx={{ border: "1px solid black" }}>
          {recorderList &&
            recorderList.map((item: any, index: any) => {
              return <ListItem key={index}>{item.title}</ListItem>;
            })}
        </List>

        <TextField
          label="음성메시지 제목"
          margin="dense"
          variant="standard"
          type="text"
          fullWidth
          onChange={handleChangeVoiceTitle}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleCloseVoiceSave}>취소</Button>
        <Button onClick={props.handleCloseVoiceSave}>저장</Button>
      </DialogActions>
    </Dialog>
  );
}
