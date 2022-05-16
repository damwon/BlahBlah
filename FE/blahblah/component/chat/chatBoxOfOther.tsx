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
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DownloadIcon from "@mui/icons-material/Download";
import dayjs from "dayjs";

const ChatTypographyByOther = styled(Typography)({
  borderRadius: "20px",
  padding: "10px 20px",
  backgroundColor: "beige",
  fontWeight: 500,
});

const ChatIconButton = styled(IconButton)({
  opacity: 0,
  transition: "300ms linear",
  "&:hover": {
    opacity: 1,
  },
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
          <ChatTypographyByOther>{props.message}</ChatTypographyByOther>
          <ChatIconButton onClick={handleClick}>
            <MoreHorizIcon />
          </ChatIconButton>
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
        <Stack
          sx={{
            borderRadius: "20px",
            padding: "10px 20px",
            backgroundColor: "beige",
            fontWeight: 500,
          }}
        >
          <Typography sx={{ borderBottom: "1px solid black", opacity: 0.5 }}>
            {props.message}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <ArrowForwardIcon />
            <Typography>{props.item.comment}</Typography>
          </Box>
        </Stack>
      )}
      <Typography sx={{ fontSize: "15px" }}>
        {dayjs(props.item.createdAt).format("HH:mm")}
      </Typography>
    </Box>
  );
}
