import * as React from "react";
import {
  ListSubheader,
  ListItemAvatar,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function ChatList(props: any) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListSubheader>채팅 리스트</ListSubheader>
      {props.chattingList.map((item: any, index: any) => {
        return (
          <ListItem key={index}>
            <ListItemAvatar>
              <AccountCircleIcon fontSize="large" />
            </ListItemAvatar>
            <ListItemText
              primary={item.roomName}
              sx={{ cursor: "pointer" }}
              onClick={() => {
                props.setChatname(item.roomName);
              }}
            />
          </ListItem>
        );
      })}
    </List>
  );
}
