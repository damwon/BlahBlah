import { Grid, Image } from "semantic-ui-react";
export default function Note() {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2} />
        <Grid.Column width={12}>
          <div className="lb-wrap">
            <div className="lb-image">
              <Image
                className="centered lb-image"
                src="/images/noteTitle.png"
                alt="noteTitle image"
              ></Image>
            </div>
            <div className="lb-text">
              <h2>Title: my Note</h2>
            </div>
          </div>

          <div className="lb-wrap">
            <div className="lb-image">
              <Image
                className="centered"
                src="/images/note.jpg"
                alt="note image"
              ></Image>
            </div>
            <div className="lb-text">
              <h2>
                내용 적는중 어떻게 나오려나내용 적는중 어떻게 나오려나내용
                적는중 어떻게 나오려나내용 적는중 어떻게 나오려나내용 적는중
                어떻게 나오려나 내용 적는중 어떻게 나오려나내용 적는중 어떻게
                나오려나내용 적는중 어떻게 나오려나
              </h2>
            </div>
          </div>
        </Grid.Column>
        <Grid.Column width={2} />
      </Grid.Row>

      <style jsx>
        {`
          .lb-wrap {
            width: 40%;
            margin: 10px auto;
            position: relative;
          }
          .lb-text {
            padding: 5px 10px;
            text-align: center;
            z-index: 1;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .lb-wrap img {
            width: 100%;
            vertical-align: middle;
          }
        `}
      </style>
    </Grid>
  );
}
