import { Grid, Image, Button, Input } from "semantic-ui-react";
export default function Edit() {
  return (
    <Grid>
      <Grid.Row centered>
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
              <input
                className="my-title"
                style={{ minWidth: "15vw", minHeight: "5vh" }}
                placeholder="Title: My Note 1"
              ></input>
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
              <textarea
                autoFocus
                style={{
                  minWidth: "13vw",
                  minHeight: "30vh",
                  maxHeight: "30vh",
                }}
                className="clean-textarea"
                placeholder="내용 적는중 어떻게 나오려나내용 적는중 어떻게 나오려나내용
                적는중 어떻게 나오려나내용 적는중 어떻게 나오려나내용 적는중
                어떻게 나오려나 내용 적는중 어떻게 나오려나내용 적는중 어떻게
                나오려나내용 적는중 어떻게 나오려나"
              ></textarea>
            </div>
          </div>
          <Grid>
            <Grid.Row centered>
              <div>
                <Button secondary style={{ margin: "20px" }}>
                  취소
                </Button>
                <Button primary style={{ margin: "20px" }}>
                  확인
                </Button>
              </div>
            </Grid.Row>
          </Grid>
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
          .clean-textarea {
            border: none;
            resize: none;
            font-size: min(1vw, 1.5vh);
            font-weight: 500;
            color: rgb(97, 17, 70);
          }
          .clean-textarea::placeholder {
            font-size: min(1vw, 1.5vh);
            font-weight: 500;
            color: rgb(97, 17, 70);
          }
          .my-title::placeholder {
            color: rgb(97, 17, 70);
            font-weight: 500;
            font-size: 1.2vw;
          }
          .my-title {
            color: rgb(97, 17, 70);
            font-weight: 500;
            font-size: 1.2vw;
          }
        `}
      </style>
    </Grid>
  );
}
