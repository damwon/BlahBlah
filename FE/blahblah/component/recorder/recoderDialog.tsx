import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import VoiceRecorder from "./recorder";

export default function RecorderDialog(props: any) {
  return (
    <Dialog open={props.openRecorder} onClose={props.handleCloseRecorder}>
      <DialogTitle>음성 녹음</DialogTitle>
      <DialogContent>
        <DialogContentText>
          녹음을 하시려면 녹음 시작하기를 누르세요
        </DialogContentText>
        <VoiceRecorder
          setVoiceUrl={props.setVoiceUrl}
          sendAudio={props.sendAudio}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleCloseRecorder}>Cancel</Button>
        <Button onClick={props.handleCloseRecorder}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}
