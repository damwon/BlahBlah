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
    }
  };

  return (
    <Dialog open={props.openImageDialog} onClose={props.handleCloseImageDialog}>
      <DialogTitle>사진 첨부</DialogTitle>
      <DialogContent>
        <DialogContentText>사진을 첨부해주세요.</DialogContentText>
      </DialogContent>
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
          <Form.Label>첨부하기</Form.Label>
          <Form.Control
            onChange={handleSetImage}
            type="file"
            accept="image/jpeg, image/jpg, image/png"
          />
        </Form.Group>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.handleCloseImageDialog();
            setImageData(null);
          }}
        >
          취소
        </Button>
        <Button
          onClick={() => {
            props.handleCloseImageDialog();
            handleSubmitImage();
          }}
        >
          전송하기
        </Button>
      </DialogActions>
    </Dialog>
  );
}
