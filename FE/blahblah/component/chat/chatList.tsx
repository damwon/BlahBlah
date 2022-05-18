import React, { useEffect, useState } from "react";
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
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";

export default function ChatList(props: any) {
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    props.setSelectedIndex(index);
  };

  return (
    <List sx={{ bgcolor: "background.paper", overflowY: "auto" }}>
      <ListSubheader
        sx={{
          textAlign: "center",
          fontSize: "20px",
          height: "70px",
        }}
      >
        Chatting List
      </ListSubheader>

      <Divider />
      {props.chattingList.length > 0 ? (
        props.chattingList.map((item: any, index: any) => {
          return (
            <div key={index}>
              <ListItem selected={props.chatRoomData.roomId === item.roomId}>
                <ListItemButton
                  onClick={(e) => {
                    props.setIsOnline(item.online);
                    props.readMsg(item.opponentId);
                    props.setChatRoomData(item);
                    props.setChatname(item.roomName);
                    handleListItemClick(e, index);
                  }}
                >
                  <ListItemAvatar sx={{ position: "relative" }}>
                    <Avatar
                      src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/profile/${item.profile}`}
                      alt=""
                    />
                    <CircleRoundedIcon
                      sx={{
                        fontSize: "14px",
                        position: "absolute",
                        right: "13px",
                        top: "25px",
                        backgroundColor: "white",
                        borderRadius: "50%",
                      }}
                      color={item.online ? "warning" : "disabled"}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.roomName}
                    sx={{ cursor: "pointer" }}
                    secondary={
                      item.type === "text" || "topic"
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
                      <Avatar
                        sx={{
                          backgroundColor: "#00CCB1",
                          height: "24px",
                          width: "24px",
                        }}
                      >
                        <Typography>{item.unread}</Typography>
                      </Avatar>
                    </ListItemAvatar>
                  )}
                </ListItemButton>
              </ListItem>
              <Divider />
            </div>
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
