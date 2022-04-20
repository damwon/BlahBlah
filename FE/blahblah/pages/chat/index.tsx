/* eslint-disable */
import { useState } from "react";
import { Input, Button, Grid, Tab, Icon } from "semantic-ui-react";
import VoiceRecordIcon from "../../component/chat/voiceRecord";

export default function Chat() {
  const [messageList, setMessageList] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const handleMessage = (e: any) => {
    setMessage(e.target.value);
  };
  const handleMessageList = () => {
    setMessageList([...messageList, message]);
    setMessage("");
  };

  // 오른쪽 탭
  const panes = [
    { menuItem: "첨삭", render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
    { menuItem: "번역", render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: "사전", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
    { menuItem: "단어장", render: () => <Tab.Pane>Tab 4 Content</Tab.Pane> },
  ];

  return (
    <Grid style={{ height: "100vh" }}>
      <Grid.Row style={{ height: "200px" }}>
        <Grid.Column width={1}>
          <Button
            onClick={() => {
              console.log("버튼 눌림");
            }}
          >
            채팅목록 열리는 버튼
          </Button>
        </Grid.Column>
        <Grid.Column width={12} textAlign="center">
          <Icon name="video" />
          <div>
            {messageList &&
              messageList.map((item, index) => {
                return (
                  <div key={index}>
                    <p>{item}</p>
                  </div>
                );
              })}
            <p></p>
          </div>
          <div>
            <Input
              icon={<VoiceRecordIcon />}
              value={message}
              placeholder="Type your message."
              onChange={handleMessage}
              onKeyPress={(e: any) => {
                if (e.key === "Enter") {
                  handleMessageList();
                }
              }}
            />
            <Button style={{ width: "100px" }} onClick={handleMessageList}>
              전송
            </Button>
          </div>
        </Grid.Column>
        <Grid.Column width={3} textAlign="center">
          <Tab panes={panes} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
