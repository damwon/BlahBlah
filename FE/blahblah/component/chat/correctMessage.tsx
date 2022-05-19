import React, { useState } from "react";
import { Box, Typography, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { InputGroup, Form } from "react-bootstrap";
import Swal from "sweetalert2";

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
      <InputGroup>
        <Form.Control
          type="text"
          style={{ width: "20vw" }}
          placeholder="Comment on peer's message."
          onChange={handleFixMessage}
          onKeyPress={(e: any) => {
            if (e.key === "Enter") {
              if (!fixedMessage) {
                Swal.fire({
                  title: "Please write your comment.",
                  confirmButtonColor: "#00ccb1",
                });
              } else {
                props.sendCorrectMsg(
                  "comment",
                  props.correctMessage,
                  fixedMessage
                );
                props.setCorrectMessage("");
              }
            }
          }}
        />
        <IconButton
          sx={{
            border: "1px solid rgb(0,204,177, .5)",
            borderLeftStyle: "none",
          }}
          onClick={() => {
            if (!fixedMessage) {
              Swal.fire({
                title: "Please write your comment.",
                confirmButtonColor: "#00ccb1",
              });
            } else {
              props.sendCorrectMsg(
                "comment",
                props.correctMessage,
                fixedMessage
              );
              props.setCorrectMessage("");
            }
          }}
        >
          <SendIcon sx={{ color: "skyblue" }} />
        </IconButton>
      </InputGroup>
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
