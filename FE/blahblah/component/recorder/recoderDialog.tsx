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
    <Dialog open={props.openRecorder} onClose={props.handleClose}>
      <DialogTitle>음성 녹음</DialogTitle>
      <DialogContent>
        <DialogContentText>
          녹음을 하시려면 녹음 시작하기를 누르세요
        </DialogContentText>
        <VoiceRecorder />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={props.handleClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}
