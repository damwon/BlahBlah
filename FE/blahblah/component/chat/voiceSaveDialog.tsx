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
import { Form } from "react-bootstrap";
import axios from "axios";

export default function VoiceSaveDialog(props: any) {
  const [voiceTitle, setVoiceTitle] = useState("");
  const handleChangeVoiceTitle = (e: any) => {
    setVoiceTitle(e.target.value);
  };
  const [recorderList, setRecorderList] = useState<any>();
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };
  useEffect(() => {
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

  const saveVoiceMsg = (recordbookId: number) => {
    if (!voiceTitle) {
      alert("음성메시지 제목을 입력하세요.");
    } else {
      axios({
        url: `https://blahblah.community:8443/api/record/${recordbookId}`,
        method: "post",
        headers: setToken(),
        data: {
          recordUrl: props.voiceMsgUrl,
          title: voiceTitle,
        },
      })
        .then((res) => {
          console.log(res);
          alert("음성메시지가 성공적으로 저장되었습니다.");
          props.handleCloseVoiceSave();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <Dialog open={props.openVoiceSave} onClose={props.handleCloseVoiceSave}>
      <DialogTitle>음성메시지 저장</DialogTitle>
      <DialogContent>
        <DialogContentText>
          폴더를 선택하시고 음성메시지의 제목을 입력하신 뒤 하단 저장 버튼을
          눌러주세요.
        </DialogContentText>
        <Form.Group className="mb-3">
          <Form.Label>음성메시지 제목</Form.Label>
          <Form.Control
            onChange={handleChangeVoiceTitle}
            type="text"
            placeholder="제목을 입력하세요."
          />
        </Form.Group>
        <List sx={{ border: "1px solid black" }}>
          {recorderList &&
            recorderList.map((item: any, index: any) => {
              return (
                <ListItem
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    saveVoiceMsg(item.id);
                  }}
                  key={index}
                >
                  {item.title}
                </ListItem>
              );
            })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleCloseVoiceSave}>취소</Button>
      </DialogActions>
    </Dialog>
  );
}
