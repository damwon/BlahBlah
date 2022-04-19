/* eslint-disable */
import { useState } from "react";
import { Input, Icon, Button, Container } from "semantic-ui-react";

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
  return (
    <Container
      style={{
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
          icon={
            <Icon
              name="microphone"
              link
              onClick={() => {
                console.log("마이크 클릭됨");
              }}
            />
          }
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

      <Button
        onClick={() => {
          console.log("버튼 눌림");
        }}
      >
        채팅목록 열리는 버튼
      </Button>
    </Container>
  );
}
