import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";

export default function ImageDialog(props: any) {
  const [imageData, setImageData] = useState<any>();
  const handleSetImage = (e: any) => {
    setImageData(e.target.files[0]);
  };

  const handleSubmitImage = async () => {
    if (imageData) {
      const form = new FormData();
      form.append("file", imageData);
      const response = await axios({
        method: "post",
        url: "https://blahblah.community:8080/api/s3/image",
        data: form,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const s3ImageUrl = response.data[0];
      await props.sendMsg("image", s3ImageUrl);
      setImageData(null);
      props.handleCloseImageDialog();
    } else {
      Swal.fire({
        title: "Please select your image.",
        confirmButtonColor: "#00ccb1",
      });
    }
  };

  return (
    <Dialog
      open={props.openImageDialog}
      onClose={props.handleCloseImageDialog}
      sx={{ zIndex: 100 }}
    >
      <DialogTitle>Send Image</DialogTitle>
      {imageData && (
        <DialogContent sx={{ textAlign: "center" }}>
          <Image
            src={URL.createObjectURL(imageData)}
            alt=""
            width="200px"
            height="200px"
          />
        </DialogContent>
      )}
      <DialogContent>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Select your Image</Form.Label>
          <Form.Control
            onChange={handleSetImage}
            type="file"
            accept="image/jpeg, image/jpg, image/png"
          />
        </Form.Group>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          variant="contained"
          onClick={() => {
            props.handleCloseImageDialog();
            setImageData(null);
          }}
        >
          Cancel
        </Button>
        <Button
          sx={{
            backgroundColor: "#00ccb1",
          }}
          variant="contained"
          onClick={() => {
            handleSubmitImage();
          }}
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}
