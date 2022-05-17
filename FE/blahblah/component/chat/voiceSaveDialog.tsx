/* eslint-disable */
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  ListItemText,
  List,
  ListItem,
} from "@mui/material";
import { Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

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
      Swal.fire({
        title: "Please write the title of the voice message.",
        confirmButtonColor: "#00ccb1",
        position: "top",
      });
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
          Swal.fire({
            title: "The voice message was successfully saved.",
            confirmButtonColor: "#00ccb1",
          });
          props.handleCloseVoiceSave();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <Dialog
      open={props.openVoiceSave}
      onClose={props.handleCloseVoiceSave}
      sx={{ zIndex: 100 }}
    >
      <DialogTitle>Save voice messages</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 3 }}>
          Write down the title of your voice message, and then click the folder.
        </DialogContentText>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            onChange={handleChangeVoiceTitle}
            type="text"
            placeholder="Make your title."
          />
        </Form.Group>
        <Form.Label>Folder List</Form.Label>
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
        <Button
          color="error"
          variant="contained"
          onClick={props.handleCloseVoiceSave}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
