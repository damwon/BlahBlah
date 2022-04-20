import { Button, Image, List } from "semantic-ui-react";

export default function ChatList() {
  return (
    <List divided verticalAlign="middle">
      <List.Item>
        <List.Content>채팅 목록</List.Content>
      </List.Item>
      <List.Item>
        <List.Content floated="right">
          <Button>Add</Button>
        </List.Content>
        <List.Content>Lindsay</List.Content>
      </List.Item>
      <List.Item>
        <List.Content floated="right">
          <Button>Add</Button>
        </List.Content>
        <List.Content>Mark</List.Content>
      </List.Item>
      <List.Item>
        <List.Content floated="right">
          <Button>Add</Button>
        </List.Content>
        <List.Content>Molly</List.Content>
      </List.Item>
    </List>
  );
}
