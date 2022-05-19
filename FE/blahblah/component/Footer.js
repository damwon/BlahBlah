import { Typography } from "@mui/material";

export default function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        marginTop: "auto",
        backgroundColor: "rgb(0,204,177, .3)",
        color: "black",
        padding: "20px",
      }}
    >
      <Typography>Copyright ⓒ2022 BlahBlah. All rights reserved.</Typography>

      <Typography>Contact: blahblah@ssafy.com</Typography>
    </footer>
  );
}
