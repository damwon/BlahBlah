import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import VoiceRecorder from "./recorder";
import axios from "axios";

export default function RecorderDialog(props: any) {
  const [voiceUrl, setVoiceUrl] = useState<any>();
  const handleSubmitVoiceRecord = async () => {
    if (voiceUrl) {
      URL.createObjectURL(voiceUrl); // 출력된 링크에서 녹음된 오디오 확인 가능
      // File 생성자를 사용해 파일로 변환
      const sound = new File([voiceUrl], "soundBlob.mp3", {
        lastModified: new Date().getTime(),
        type: "audio/mp3",
      });
      console.log(sound);
      const form = new FormData();
      form.append("file", sound);
      const audioResponse = await axios({
        method: "post",
        url: "https://blahblah.community:8080/api/s3/audio",
        data: form,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const s3Url = audioResponse.data[0];
      await props.sendMsg("audio", s3Url);
      setVoiceUrl(null);
      props.handleCloseRecorder();
    } else {
      alert("Please record your voice.");
    }
  };
  return (
    <Dialog open={props.openRecorder} onClose={props.handleCloseRecorder}>
      <DialogTitle>Voice Recorder</DialogTitle>
      <DialogContent>
        <DialogContentText>Please press Start Button.</DialogContentText>
        <VoiceRecorder setVoiceUrl={setVoiceUrl} />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setVoiceUrl(null);
            props.handleCloseRecorder();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleSubmitVoiceRecord();
          }}
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}
