import { Modal, Button, Header, Icon } from "semantic-ui-react";
import { useState } from "react";

export default function WordWrite() {
  const [open, setOpen] = useState(false);
  return (
    <Modal
      className="my-modal"
      closeIcon
      open={open}
      trigger={<Button primary>단어 추가</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="pencil" content="추가할 단어와 뜻을 작성해보세요!" />
      <Modal.Content>
        <p></p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>
          <Icon name="remove" /> 취소
        </Button>
        <Button color="green" onClick={() => setOpen(false)}>
          <Icon name="checkmark" /> 작성
        </Button>
      </Modal.Actions>
      <style jsx>
        {`
          .my-modal {
            margin: auto !important;
          }
        `}
      </style>
    </Modal>
  );
}
