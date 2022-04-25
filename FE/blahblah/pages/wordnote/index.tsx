import { Grid } from "@mui/material";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import Image from "next/image";
export default function WordNote() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Grid
        spacing={3}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Image
            src="/images/characters.PNG"
            alt="characters image"
            width="100%"
            height="100%"
          />
          {/* <img
            src="/images/characters.PNG"
            alt="characters image"
            className="img-fluid"
            width="100%"
          ></img> */}
          <h1 className="cent">Title:</h1>
          <Grid
            spacing={2}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={4}>
              <div className="cent">
                <h1>Word</h1>
                <p>water</p>
                <p>red</p>
                <p>book</p>
                <p>look</p>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="cent">
                <h1>Mean</h1>
                <p>물</p>
                <p>빨간색</p>
                <p>책</p>
                <p>보다</p>
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={5} />
            <Grid item xs={2}>
              <Button
                variant="primary"
                onClick={handleShow}
                className="mar-auto"
              >
                Launch demo modal
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} />
      </Grid>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>추가할 단어를 입력해보세요!</Modal.Title>
        </Modal.Header>
        <Modal.Body>seunghwan 천재</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" onClick={handleClose}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>
        {`
          .cent {
            text-align: center;
          }
          .mar-auto {
            margin-left: auto;
          }
        `}
      </style>
    </>
  );
}
