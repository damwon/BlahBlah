import {
  Box,
  Typography,
  styled,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import Image from "react-bootstrap/Image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DownloadIcon from "@mui/icons-material/Download";
import dayjs from "dayjs";

const ChatTypographyByOther = styled(Typography)({
  borderRadius: "20px",
  padding: "10px 20px",
  backgroundColor: "beige",
  fontWeight: 500,
  maxWidth: "500px",
  wordBreak: "break-all",
});

export default function ChatBoxOfOther(props: any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [topicText, setTopicText] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setTopicText(event.target.innerText);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: props.item.type === "topic" ? "center" : "start",
      }}
    >
      {props.type === "text" && (
        <>
          <ChatTypographyByOther
            sx={{ cursor: "pointer" }}
            onClick={handleClick}
          >
            {props.message}
          </ChatTypographyByOther>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem
              onClick={() => {
                handleClose();
                props.setCorrectMessage(props.message);
              }}
            >
              Comment
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                props.setTranslateMessage(props.message);
              }}
            >
              Translate
            </MenuItem>
          </Menu>
        </>
      )}
      {props.type === "topic" && (
        <>
          <Stack direction="row" sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                padding: "15px 20px",
                borderRadius: "20px",
                backgroundColor: "white",
                color: "black",
                border: "1px solid #b5b5b5",
                maxWidth: "400px",
                wordBreak: "break-all",
                cursor: "pointer",
              }}
              onClick={handleClick}
            >
              {props.item.content.split(" VS ")[0]}
            </Typography>
            <Box>
              <Typography
                sx={{
                  color: "black",
                  marginX: 1,
                }}
              >
                VS
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                padding: "15px 20px",
                borderRadius: "20px",
                backgroundColor: "skyblue",
                color: "white",
                maxWidth: "400px",
                wordBreak: "break-all",
              }}
            >
              <Typography onClick={handleClick} sx={{ cursor: "pointer" }}>
                {props.item.content.split(" VS ")[1]}
              </Typography>
            </Box>
          </Stack>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem
              onClick={() => {
                handleClose();
                props.setCorrectMessage(topicText);
              }}
            >
              Comment
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                props.setTranslateMessage(topicText);
              }}
            >
              Translate
            </MenuItem>
          </Menu>
        </>
      )}
      {props.type === "audio" && (
        <>
          <audio src={props.message} controls controlsList="nodownload" />
          <IconButton
            onClick={() => {
              props.handleClickOpenVoiceSave(props.message);
            }}
          >
            <DownloadIcon />
          </IconButton>
        </>
      )}
      {props.type === "image" && (
        <Image
          src={props.message}
          alt="image"
          style={{ width: "300px", height: "300px" }}
        />
      )}
      {props.type === "comment" && (
        <Stack>
          <Typography
            sx={{
              padding: "10px 20px",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              backgroundColor: "white",
              color: "black",
              border: "1px solid #b5b5b5",
              maxWidth: "500px",
              wordBreak: "break-all",
            }}
          >
            {props.message}
          </Typography>
          <Box
            sx={{
              display: "flex",
              padding: "10px 20px",
              borderBottomRightRadius: "20px",
              borderBottomLeftRadius: "20px",
              backgroundColor: "beige",
              border: "1px solid #b5b5b5",
              borderTopStyle: "none",
              maxWidth: "500px",
              wordBreak: "break-all",
            }}
          >
            <ArrowForwardIcon sx={{ mr: 1 }} />
            <Typography>{props.item.comment}</Typography>
          </Box>
        </Stack>
      )}
      <Typography sx={{ fontSize: "12px", ml: "10px" }}>
        {dayjs(props.item.createdAt).format("HH:mm")}
      </Typography>
    </Box>
  );
}
