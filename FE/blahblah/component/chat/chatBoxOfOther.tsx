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
});

export default function ChatBoxOfOther(props: any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
        justifyContent: "start",
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
          style={{ width: "200px", height: "200px" }}
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
