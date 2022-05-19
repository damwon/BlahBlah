import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";

export default function GameDialog(props: any) {
  const topicList = [
    {
      id: 1,
      topic: "Food",
    },
    {
      id: 2,
      topic: "Lover",
    },
    {
      id: 3,
      topic: "Pain",
    },
    {
      id: 4,
      topic: "Like",
    },
  ];

  const submitRandomTopic = async (topicId: number) => {
    try {
      const response = await axios({
        url: `https://blahblah.community:8443/api/versus/${topicId}`,
        method: "get",
      });
      const randomTopic = response.data;
      console.log(randomTopic);
      props.sendMsg("topic", randomTopic);
      props.handleCloseGame();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog
      fullWidth
      open={props.openGame}
      onClose={props.handleCloseGame}
      sx={{ zIndex: 100 }}
    >
      <DialogTitle sx={{ textAlign: "center" }}>Topic</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: "center" }}>
          Choose a topic you want to talk about with your peer!
        </DialogContentText>
        <List>
          {topicList.map((item: any) => {
            return (
              <ListItemButton
                key={item.id}
                onClick={() => {
                  submitRandomTopic(item.id);
                }}
              >
                <ListItemText primary={`${item.id}. ${item.topic}`} />
              </ListItemButton>
            );
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          variant="contained"
          onClick={props.handleCloseGame}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
