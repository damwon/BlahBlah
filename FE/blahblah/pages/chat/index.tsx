/* eslint-disable */
import { useState } from "react";
import WordNote from "../wordnote";
import Note from "../note";
import ChatList from "../../component/chat/chatList";
import { Button, TextField, IconButton, Box, Typography } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import VideocamIcon from "@mui/icons-material/Videocam";
import ChatTabs from "../../component/chat/chatTabs";
import SendIcon from "@mui/icons-material/Send";

export default function Chat() {
  const dummyMessageList = [
    {
      username: "Geuntae",
      message: "Hello?",
    },
    {
      username: "me",
      message: "Hello!",
    },
  ];
  const [messageList, setMessageList] = useState<any[]>(dummyMessageList);
  const [message, setMessage] = useState<string>("");
  const handleMessage = (e: any) => {
    setMessage(e.target.value);
  };
  const handleMessageList = () => {
    setMessageList([...messageList, { username: "me", message: message }]);
    setMessage("");
  };

  return (
    <Box
      style={{
        height: "90vh",
        marginTop: "20px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <ChatList />
      </Box>
      <Box
        sx={{
          display: "flex",
          border: "1px solid black",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: "50%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            padding: 3,
            borderBottom: "1px solid black",
            justifyContent: "space-between",
          }}
        >
          <Typography>username: 종준</Typography>
          <Box>
            <IconButton
              onClick={() => {
                alert("영상통화 버튼 눌림.");
              }}
            >
              <VideocamIcon sx={{ color: "black" }} />
            </IconButton>
            <IconButton
              onClick={() => {
                alert("신고 버튼 눌림.");
              }}
            >
              <ReportIcon color="warning" />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {messageList &&
            messageList.map((item, index) => {
              if (item.username === "me") {
                return (
                  <Box
                    sx={{
                      width: "100%",
                      padding: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "end",
                    }}
                    key={index}
                  >
                    <Typography>
                      {item.username}: {item.message}
                    </Typography>
                  </Box>
                );
              } else {
                return (
                  <Box
                    sx={{
                      width: "100%",
                      padding: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "start",
                    }}
                    key={index}
                  >
                    <Typography>
                      {item.username}: {item.message}
                    </Typography>
                  </Box>
                );
              }
            })}
        </Box>
        <Box>
          <TextField
            sx={{ width: "500px" }}
            value={message}
            placeholder="Type your message."
            onChange={handleMessage}
            onKeyPress={(e: any) => {
              if (e.key === "Enter") {
                handleMessageList();
              }
            }}
            variant="standard"
          />
          <IconButton onClick={handleMessageList}>
            <SendIcon color="primary" />
          </IconButton>
        </Box>
      </Box>
      <ChatTabs />
    </Box>
  );
}
