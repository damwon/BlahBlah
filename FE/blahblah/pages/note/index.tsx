import { Grid, Image } from "semantic-ui-react";
export default function Note() {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2} />
        <Grid.Column width={12}>
          <div className="lb-wrap">
            <div className="lb-text">
              {/* <h2>Title: my Note asdasd</h2> */}
            </div>
            <div className="lb-image">
              <Image
                className="centered lb-image"
                src="/images/noteTitle.png"
                alt="noteTitle image"
              ></Image>
            </div>
          </div>

          <Image
            className="centered"
            src="/images/note.jpg"
            alt="note image"
          ></Image>
        </Grid.Column>
        <Grid.Column width={2} />
      </Grid.Row>

      <style jsx>
        {`
          .lb-wrap {
            display: flex;
            justify-content: center;
            position: relative;
            text-align: center;
          }
          .lb-text {
            position: absolute;
            top: 30%;
            left: 35%;
            z-index: 1;
          }
        `}
      </style>
    </Grid>
  );
}
