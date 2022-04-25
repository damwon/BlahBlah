import * as React from "react";
import {
  ListSubheader,
  ListItemAvatar,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function ChatList() {
  const userData = [
    {
      name: "Geuntae",
    },
    {
      name: "Jaehyeon",
    },
    {
      name: "Seongkeon",
    },
    {
      name: "Jiwon",
    },
    {
      name: "Seunghwan",
    },
  ];
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListSubheader>채팅 리스트</ListSubheader>
      {userData.map((item, index) => {
        return (
          <ListItem key={index}>
            <ListItemAvatar>
              <AccountCircleIcon fontSize="large" />
            </ListItemAvatar>
            <ListItemText
              primary={item.name}
              sx={{ cursor: "pointer" }}
              onClick={() => {
                alert(`${item.name} 눌림!`);
              }}
            />
          </ListItem>
        );
      })}
    </List>
  );
}
