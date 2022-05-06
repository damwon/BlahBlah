import { Container,Row,Col,Card,Button,ListGroup } from 'react-bootstrap';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export default function Mate(props) {

  

  return <>
  <Container>
    <Row>
      <Col sm={2} xs={2}>

      {/* {props.user.name}
      {props.user.description}
      {props.user.gender ===1
  ?<>남자</>
  :<>여자</>
  } */}
      </Col>
      <Col>  
      <div className='matebox'>
      <div className='box'>
      <Avatar
        alt="ProfileImage"
        src={`https://blahblah-ssafy.s3.ap-northeast-2.amazonaws.com/profile/${props.user.profileImg}`}
        // src="/user/young-man.png"
        sx={{ width: 100, height: 100 }}
      />
      </div>
      <div className='box'>
      <ListItemText primary={`${props.user.name}(${props.user.age})`} secondary={props.user.gender ===1
  ?<>남자</>
  :<>여자</>
  }/>
        {/* <h5>{props.user.name}({props.user.age})</h5> */}
        {/* <h5>{props.user.gender ===1
  ?<>남자</>
  :<>여자</>
  }</h5> */}

      </div>
      </div>
      <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      {/* <ListItem>
        <ListItemText primary="모국어" secondary="영어" />
      </ListItem>
      <Divider component="li" /> */}
      <ListItem>
        <ListItemText primary="구사언어" secondary="중국어, 스페인어" />
      </ListItem>
      <Divider component="li"/>
      <ListItem>
        <ListItemText primary="학습언어" secondary="한국어" />
      </ListItem>
      {/* <Divider component="li"/> */}


    </List>
      
      </Col>
      
      <Col>
      <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      <ListItem>
        <ListItemText primary="Photos" secondary="Jan 9, 2014" />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Work" secondary="Jan 7, 2014" />
      </ListItem>
      <Divider component="li"/>
      <ListItem>
        <ListItemText primary="Work" secondary="Jan 7, 2014" />
      </ListItem>
      {/* <Divider component="li"/> */}


    </List>
</Col>
  <Col sm={2} xs={2}></Col>
    </Row>
    <hr></hr>
  </Container>






<style jsx>{`
        .matebox{
          border-radius: 15px;
          background-color:#e8feff;
          display: flex;
        }
        .box{
          float:left;
          margin:10px;
        }
        

      `}</style>
  </>
}

