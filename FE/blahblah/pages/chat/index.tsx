/* eslint-disable */
import { useState, useRef, useEffect } from "react";
import ChatList from "../../component/chat/chatList";
import { styled, TextField, IconButton, Box, Typography } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import VideocamIcon from "@mui/icons-material/Videocam";
import ChatTabs from "../../component/chat/chatTabs";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import RecorderDialog from "../../component/recorder/recoderDialog";
import ChatBoxOfOther from "../../component/chat/chatBoxOfOther";
import CorrectMessage from "../../component/chat/correctMessage";

const ChatTypographyByMe = styled(Typography)({
  borderRadius: "20px",
  padding: "10px 20px",
  backgroundColor: "skyblue",
  color: "white",
  fontWeight: 500,
});

const ChatBox = styled(Box)({
  overflowY: "auto",
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

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
    {
      username: "Geuntae",
      message: "Nice to meet you!",
    },
    {
      username: "Geuntae",
      message: "What do you do?",
    },
    {
      username: "me",
      message: "I am a frontend developer!",
    },
    {
      username: "Geuntae",
      message: "That's cool!",
    },
  ];
  const [messageList, setMessageList] = useState<any[]>(dummyMessageList);
  const [message, setMessage] = useState<string>("");
  const handleMessage = (e: any) => {
    setMessage(e.target.value);
  };

  const chatRef = useRef<any>(null);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  const handleMessageList = () => {
    if (message) {
      setMessageList([...messageList, { username: "me", message: message }]);
      setMessage("");
    } else {
      alert("메시지를 입력해주세요.");
    }
  };
  // recorder dialog 열고 닫기
  const [openRecorder, setOpenRecorder] = useState(false);
  const handleClickOpenRecorder = () => {
    setOpenRecorder(true);
  };

  const handleClose = () => {
    setOpenRecorder(false);
  };

  const [chatname, setChatname] = useState("Geuntae");

  const [correctMessage, setCorrectMessage] = useState("");

  return (
    <>
      <Box
        style={{
          height: "80vh",
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <ChatList setChatname={setChatname} />
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
            <Typography>username: {chatname}</Typography>
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
          <ChatBox ref={chatRef} className="chatbox-scroll">
            {messageList &&
              messageList.map((item, index) => {
                if (item.username === "me") {
                  return (
                    <Box
                      sx={{
                        width: "100%",
                        padding: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                      }}
                      key={index}
                    >
                      <ChatTypographyByMe>{item.message}</ChatTypographyByMe>
                    </Box>
                  );
                } else {
                  return (
                    <ChatBoxOfOther
                      key={index}
                      message={item.message}
                      setCorrectMessage={setCorrectMessage}
                    />
                  );
                }
              })}
          </ChatBox>
          <Box
            sx={{
              borderTop: "1px solid black",
              width: "100%",
              height: "15%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {correctMessage && (
              <CorrectMessage
                correctMessage={correctMessage}
                setCorrectMessage={setCorrectMessage}
              />
            )}
            <Box>
              <TextField
                sx={{ width: "30vw" }}
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
              <IconButton onClick={handleClickOpenRecorder}>
                <MicIcon sx={{ color: "black" }} />
              </IconButton>
            </Box>

            <RecorderDialog
              openRecorder={openRecorder}
              setOpenRecorder={setOpenRecorder}
              handleClose={handleClose}
            />
          </Box>
        </Box>
        <ChatTabs />
      </Box>
    </>
  );
}
