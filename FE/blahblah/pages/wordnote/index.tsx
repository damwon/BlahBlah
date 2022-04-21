import { Grid } from "@mui/material";
import { Image, Button, Modal } from "react-bootstrap";
import { useState } from "react";
export default function WordNote() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Image
        className="centered"
        src="/images/characters.PNG"
        alt="meltingPot image"
      ></Image>

      <h1>Title:</h1>
      <h1>Word</h1>
      <p>water</p>
      <p>red</p>
      <p>book</p>
      <p>look</p>
      <h1>Mean</h1>
      <p>물</p>
      <p>빨간색</p>
      <p>책</p>
      <p>보다</p>

      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{``}</style>
    </>
  );
}
