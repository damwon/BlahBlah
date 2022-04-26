import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

function VoiceRecorder() {
  // let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  async function requestRecorder() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return new MediaRecorder(stream);
  }

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    // Manage recorder state.
    if (isRecording) {
      recorder.start();
    } else {
      recorder.stop();
    }

    // Obtain the audio when ready.
    const handleData = (e) => {
      setAudioURL(URL.createObjectURL(e.data));
    };

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  return (
    <>
    {audioURL && <audio src={audioURL} controls controlsList="nodownload" />}
      
      <Button onClick={startRecording} disabled={isRecording}>
        녹음 시작
      </Button>
      <Button onClick={stopRecording} disabled={!isRecording}>
        녹음 중지
      </Button>
    </>
  );
}

export default VoiceRecorder;
