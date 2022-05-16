import { Typography } from "@mui/material";

export default function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        marginTop: "auto",
        backgroundColor: "#00CCB1",
        color: "white",
        padding: "8px 8px 8px 8px",
      }}
    >
      <Typography>Copyright ⓒ2022 BlahBlah. All rights reserved.</Typography>

      <Typography>Contact: blahblah@ssafy.com</Typography>
    </footer>
  );
}
