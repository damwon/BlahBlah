import React, { useState } from "react";
import {
  ListSubheader,
  ListItemAvatar,
  List,
  ListItem,
  ListItemText,
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
    <List sx={{ bgcolor: "background.paper" }}>
      <ListSubheader sx={{ textAlign: "center", fontSize: "20px" }}>
        Chatting List
      </ListSubheader>
      {props.chattingList.length > 0 ? (
        props.chattingList.map((item: any, index: any) => {
          return (
            <ListItem
              selected={props.chatRoomData.roomId === item.roomId}
              key={index}
            >
              <ListItemAvatar>
                <AccountCircleIcon fontSize="large" />
              </ListItemAvatar>
              <ListItemText
                primary={item.roomName}
                sx={{ cursor: "pointer" }}
                onClick={(e) => {
                  props.readMsg(item.opponentId);
                  props.setChatRoomData(item);
                  props.setChatname(item.roomName);
                  handleListItemClick(e, index);
                }}
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
              <ListItemText primary={item.unread === 0 ? "" : item.unread} />
            </ListItem>
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
