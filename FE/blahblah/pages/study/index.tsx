import { Grid } from "@mui/material";
import { Image } from "react-bootstrap";
export default function Study() {
  return (
    <>
      <Image
        className="centered"
        src="/images/study.PNG"
        alt="meltingPot image"
      ></Image>
      <div className="cent">
        <h1>hi</h1>
        <br></br>
      </div>
      <h1 className="cent">word note</h1>

      <h1 className="cent">record note</h1>

      <h1 className="cent">my note</h1>

      <style jsx>
        {`
          .cent {
            text-align: center;
            }
          }
        `}
      </style>
    </>
  );
}
