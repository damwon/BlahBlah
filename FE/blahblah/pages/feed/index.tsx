import { useEffect, useState } from "react";
import {
  Button,
  Grid,
  List,
  ListItem,
  IconButton,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
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
      .get(`/feed`, { headers: setToken() })
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
        <Grid item xs={3}/>
        <Grid item xs={6}>
          <div>
            <Button
                    style={{ width: 100 }}
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    피드 작성
                  </Button>
          </div>
          <List dense={dense}>
            {[0, 1, 2, 3].map((d: any, i: number) => {
              return (
                
                <ListItem
                  key={i}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar 
                  >
                    
<div className="container">
  <div className="outer">
  <Image className="profile" src="/images/finger.PNG" width='200%' height='200%' layout="responsive"></Image>
    <div className="innerLT"></div>
    <div className="innerRT"></div>
    <div className="innerLB"><Image className="report" src="/images/siren.png" width='26' height='26'></Image></div>
    <div className="innerRB"></div>
    </div>
    </div>
                  </ListItemAvatar>
                  <ListItemText
                    style={{ cursor: "pointer", margin: '10px'}}
                    onClick={() => {
                      router.push(`/note/${d.id}`);
                    }}
                    primary={d.title}
                  />
                  <h5>내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</h5>
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={3} />
      </Grid>
      <style jsx>
        {`

.container {
  width: 150px;
  height: 150px;
  display: block;
  margin: 0 auto;
}

.outer {
  width: 200px !important;
  height: 200px !important;
  max-width: 150px !important; /* any size */
  max-height: 150px !important; /* any size */
  margin: auto;
  background-color: #6eafd4;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  }

  
.innerLT {
  background-color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
}
.innerRT {
  background-color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}
.innerLB {
  background-color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  bottom: 20px;
  left: 20px;
  cursor: pointer;
}
.innerRB {
  background-color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
}

.inner:hover {
  background-color: #5555ff;
}
        `}
      </style>
    </>
  );
}
