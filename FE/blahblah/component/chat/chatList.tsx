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
import axios from "axios";

export default function ChatList(props: any) {
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    props.setSelectedIndex(index);
  };

  const getProfileImage = (userId: number) => {
    axios({
      url: `https://blahblah.community:8443/api/user/profileImg/${userId}`,
      method: "get",
    }).then((res) => {
      console.log(res.data);
      return res.data;
    });
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
            <div key={index}>
              <ListItem selected={props.chatRoomData.roomId === item.roomId}>
                <ListItemButton
                  onClick={(e) => {
                    props.readMsg(item.opponentId);
                    props.setChatRoomData(item);
                    props.setChatname(item.roomName);
                    handleListItemClick(e, index);
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/profile/${getProfileImage(
                        item.opponentId
                      )}`}
                      alt=""
                    />
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
