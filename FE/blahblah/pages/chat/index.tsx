/* eslint-disable */
import { useState } from "react";
// import { Input, Button, List, Tab, Icon } from "semantic-ui-react";
import VoiceRecordIcon from "../../component/chat/voiceRecord";
import WordNote from "../wordnote";
import Note from "../note";
import ChatList from "../../component/chat/chatList";

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
  // const panes = [
  //   {
  //     menuItem: "첨삭",
  //     render: () => (
  //       <Tab.Pane style={{ height: "80vh" }}>Tab 1 Content</Tab.Pane>
  //     ),
  //   },
  //   {
  //     menuItem: "번역",
  //     render: () => (
  //       <Tab.Pane style={{ height: "80vh" }}>Tab 2 Content</Tab.Pane>
  //     ),
  //   },
  //   {
  //     menuItem: "사전",
  //     render: () => (
  //       <Tab.Pane style={{ height: "80vh" }}>Tab 3 Content</Tab.Pane>
  //     ),
  //   },
  //   {
  //     menuItem: "단어장",
  //     render: () => (
  //       <Tab.Pane style={{ height: "80vh" }}>
  //         <WordNote />
  //       </Tab.Pane>
  //     ),
  //   },
  //   {
  //     menuItem: "메모",
  //     render: () => (
  //       <Tab.Pane style={{ height: "80vh" }}>
  //         <Note />
  //       </Tab.Pane>
  //     ),
  //   },
  // ];

  // 채팅 리스트 토글
  const [isChatListOpen, setIsChatListOpen] = useState<boolean>(false);
  const handleToggleChatList = () => {
    setIsChatListOpen(!isChatListOpen);
  };

  return (
    <div
      style={{
        height: "100%",
        marginTop: "20px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {/* <div>
        <Button onClick={handleToggleChatList}>채팅목록 열리는 버튼</Button>
        {isChatListOpen ? <ChatList /> : null}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Icon
            name="video"
            link
            onClick={() => {
              alert("영상통화 버튼 눌림.");
            }}
          />
          <Icon
            name="call"
            link
            onClick={() => {
              alert("음성통화 버튼 눌림.");
            }}
          />
        </div>

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
      </div>
      <div style={{ textAlign: "center", width: "20%" }}>
        <Tab panes={panes} />
      </div> */}
    </div>
  );
}
