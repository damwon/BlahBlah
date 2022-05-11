import * as React from "react";
import {
  ListSubheader,
  ListItemAvatar,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/router";

export default function ChatList(props: any) {
  const router = useRouter();
  return (
    <List sx={{ bgcolor: "background.paper" }}>
      <ListSubheader sx={{ textAlign: "center", fontSize: "20px" }}>
        채팅 리스트
      </ListSubheader>
      {props.chattingList.length > 0 ? (
        props.chattingList.map((item: any, index: any) => {
          return (
            <ListItem key={index}>
              <ListItemAvatar>
                <AccountCircleIcon fontSize="large" />
              </ListItemAvatar>
              <ListItemText
                primary={item.roomName}
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  props.setChatRoomData(item);
                  props.setChatname(item.roomName);
                  router.push(`/chat/${item.roomId}`);
                }}
                secondary={
                  item.type === "text"
                    ? item.lastMsg
                    : item.type === "image"
                    ? "사진"
                    : item.type === "audio"
                    ? "음성 메시지"
                    : item.type === "comment"
                    ? "첨삭 메시지"
                    : ""
                }
              />
            </ListItem>
          );
        })
      ) : (
        <ListItem>
          <ListItemText>채팅 목록이 없습니다.</ListItemText>
        </ListItem>
      )}
    </List>
  );
}
