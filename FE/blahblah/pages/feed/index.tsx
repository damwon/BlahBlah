import { useEffect, useState } from "react";
import {
  Button,
  Grid,
  List,
  ListItem,
  IconButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import allAxios from "../../lib/allAxios";
import { useRouter } from "next/router";
export default function Index() {
  const router = useRouter();
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };
  useEffect(() => {
    allAxios
      .get(`/feed_all`, { headers: setToken() })
      // .get(`/memo?size=5&page=1`, { headers: setToken() })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  const [dense, setDense] = useState(false);
  return (
    <>
      <Grid spacing={3} container>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <List dense={dense}>
            {[0, 1, 2, 3].map((d: any, i: number) => {
              return (
                <ListItem
                  key={i}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      // onClick={() => {
                      //   lstDelete(d.id, d.title);
                      // }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar
                    style={{ cursor: "pointer" }}
                    // onClick={() => {
                    //   changeOpen(d);
                    // }}
                  >
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      router.push(`/note/${d.id}`);
                    }}
                    primary={d.title}
                  />
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </>
  );
}
