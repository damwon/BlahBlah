import React, { useState } from "react";
import { Box, Typography, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function CorrectMessage(props: any) {
  const [fixedMessage, setFixedMessage] = useState("");
  const handleFixMessage = (e: any) => {
    setFixedMessage(e.target.value);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography sx={{ mr: 3 }}>{props.correctMessage}</Typography>
      <ArrowForwardIcon sx={{ mr: 3 }} />
      <TextField
        sx={{ width: "20vw" }}
        variant="standard"
        onChange={handleFixMessage}
        defaultValue={props.correctMessage}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === "Enter") {
            props.sendCorrectMsg("comment", props.correctMessage, fixedMessage);
            props.setCorrectMessage("");
          }
        }}
      />
      <IconButton
        onClick={() => {
          props.sendCorrectMsg("comment", props.correctMessage, fixedMessage);
          props.setCorrectMessage("");
        }}
      >
        <SendIcon color="primary" />
      </IconButton>
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
