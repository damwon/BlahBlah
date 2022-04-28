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
  const userData = [
    {
      name: "Geuntae",
      selected: true,
    },
    {
      name: "Jaehyeon",
      selected: false,
    },
    {
      name: "Seongkeon",
      selected: false,
    },
    {
      name: "Jiwon",
      selected: false,
    },
    {
      name: "Seunghwan",
      selected: false,
    },
  ];
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListSubheader>채팅 리스트</ListSubheader>
      {userData.map((item, index) => {
        return (
          <ListItem selected={item.selected} key={index}>
            <ListItemAvatar>
              <AccountCircleIcon fontSize="large" />
            </ListItemAvatar>
            <ListItemText
              primary={item.name}
              sx={{ cursor: "pointer" }}
              onClick={() => {
                props.setChatname(item.name);
              }}
            />
          </ListItem>
        );
      })}
    </List>
  );
}
