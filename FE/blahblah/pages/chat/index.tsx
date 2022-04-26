/* eslint-disable */
import { useState, useRef, useEffect } from "react";
import WordNote from "../wordnote";
import Note from "../note";
import ChatList from "../../component/chat/chatList";
import {
  styled,
  Button,
  TextField,
  IconButton,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import VideocamIcon from "@mui/icons-material/Videocam";
import ChatTabs from "../../component/chat/chatTabs";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import VoiceRecorder from "../../component/recorder/recorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const ChatTypographyByMe = styled(Typography)({
  borderRadius: "10px",
  padding: "10px",
  backgroundColor: "skyblue",
  color: "white",
  fontWeight: 500,
});

const ChatTypographyByOther = styled(Typography)({
  borderRadius: "10px",
  padding: "10px",
  backgroundColor: "beige",
  fontWeight: 500,
});

const ChatBox = styled(Box)({
  overflowY: "auto",
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  // "&::-webkit-scrollbar": {
  //   display: "none",
  // },
});

const ChatIconButton = styled(IconButton)({
  opacity: 0,
  transition: "300ms linear",
  "&:hover": {
    opacity: 1,
  },
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
  const handleClickOpen = () => {
    setOpenRecorder(true);
  };

  const handleClose = () => {
    setOpenRecorder(false);
  };

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
                      <ChatTypographyByMe>
                        {item.username}: {item.message}
                      </ChatTypographyByMe>
                    </Box>
                  );
                } else {
                  return (
                    <Box
                      sx={{
                        width: "100%",
                        padding: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "start",
                      }}
                      key={index}
                    >
                      <ChatTypographyByOther>
                        {item.username}: {item.message}
                      </ChatTypographyByOther>
                      <ChatIconButton>
                        <MoreHorizIcon />
                      </ChatIconButton>
                    </Box>
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
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
            <IconButton onClick={handleClickOpen}>
              <MicIcon sx={{ color: "black" }} />
            </IconButton>
            <Dialog open={openRecorder} onClose={handleClose}>
              <DialogTitle>음성 녹음</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  녹음을 하시려면 녹음 시작하기를 누르세요
                </DialogContentText>
                <VoiceRecorder />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Subscribe</Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
        <ChatTabs />
      </Box>
    </>
  );
}
