import React, { useState } from "react";
import {
  ListSubheader,
  ListItemAvatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemButton,
  Avatar,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function ChatList(props: any) {
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    props.setSelectedIndex(index);
  };
  return (
    <List sx={{ bgcolor: "background.paper", overflowY: "auto" }}>
      <ListSubheader sx={{ textAlign: "center", fontSize: "20px" }}>
        Chatting List
      </ListSubheader>
      <Divider />
      {props.chattingList.length > 0 ? (
        props.chattingList.map((item: any, index: any) => {
          return (
            <>
              <ListItem
                selected={props.chatRoomData.roomId === item.roomId}
                key={index}
              >
                <ListItemButton
                  onClick={(e) => {
                    props.readMsg(item.opponentId);
                    props.setChatRoomData(item);
                    props.setChatname(item.roomName);
                    handleListItemClick(e, index);
                  }}
                >
                  <ListItemAvatar>
                    <AccountCircleIcon fontSize="large" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.roomName}
                    sx={{ cursor: "pointer" }}
                    secondary={
                      item.type === "text"
                        ? item.lastMsg
                        : item.type === "image"
                        ? "Image"
                        : item.type === "audio"
                        ? "Voice Message"
                        : item.type === "comment"
                        ? "Comment"
                        : ""
                    }
                  />
                  {item.unread === 0 ? null : (
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: "#00CCB1" }}>
                        <Typography>{item.unread}</Typography>
                      </Avatar>
                    </ListItemAvatar>
                  )}
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          );
        })
      ) : (
        <ListItem>
          <ListItemText>No chatting list.</ListItemText>
        </ListItem>
      )}
    </List>
  );
}
