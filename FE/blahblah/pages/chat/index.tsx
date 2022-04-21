/* eslint-disable */
import { useState } from "react";
import WordNote from "../wordnote";
import Note from "../note";
import ChatList from "../../component/chat/chatList";
import { Button, TextField, IconButton, Box } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import VideocamIcon from "@mui/icons-material/Videocam";
import CallIcon from "@mui/icons-material/Call";

export default function Chat() {
  const [messageList, setMessageList] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const handleMessage = (e: any) => {
    setMessage(e.target.value);
  };
  const handleMessageList = () => {
    setMessageList([...messageList, message]);
    setMessage("");
  };

  // 채팅 리스트 토글
  const [isChatListOpen, setIsChatListOpen] = useState<boolean>(false);
  const handleToggleChatList = () => {
    setIsChatListOpen(!isChatListOpen);
  };

  return (
    <Box
      style={{
        height: "100%",
        marginTop: "20px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Button onClick={handleToggleChatList}>채팅목록 열리는 버튼</Button>
        {isChatListOpen ? <ChatList /> : null}
      </Box>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <IconButton
            onClick={() => {
              alert("영상통화 버튼 눌림.");
            }}
          >
            <VideocamIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              alert("음성통화 버튼 눌림.");
            }}
          >
            <CallIcon />
          </IconButton>
        </Box>

        <Box>
          {messageList &&
            messageList.map((item, index) => {
              return (
                <Box key={index}>
                  <p>{item}</p>
                </Box>
              );
            })}
          <p></p>
        </Box>
        <Box>
          <TextField
            value={message}
            placeholder="Type your message."
            onChange={handleMessage}
            onKeyPress={(e: any) => {
              if (e.key === "Enter") {
                handleMessageList();
              }
            }}
          />
          <Button style={{ width: "100px" }} onClick={handleMessageList}>
            전송
          </Button>
        </Box>
      </Box>
      {/* <div style={{ textAlign: "center", width: "20%" }}>
        <Tab panes={panes} />
      </div> */}
    </Box>
  );
}
