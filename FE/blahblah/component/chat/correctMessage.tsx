import { useState } from "react";
import { Box, Typography, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function CorrectMessage(props: any) {
  const [fixedMessage, setFixedMessage] = useState("");
  const handleFixMessage = (e: any) => {
    setFixedMessage(e.target.value);
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Typography>{props.correctMessage}</Typography>
      <ArrowForwardIcon />
      <TextField
        variant="standard"
        onChange={handleFixMessage}
        defaultValue={props.correctMessage}
      />
      <Typography>{fixedMessage}</Typography>
      <IconButton
        onClick={() => {
          props.setCorrectMessage("");
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
}
