import { Grid, Image, Button, Form, TextArea } from "semantic-ui-react";

export default function QnaWrite() {
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column width={2} />
        <Grid.Column width={12}>
          <Image
            className="centered"
            src="/images/notice.PNG"
            alt="notice2 image"
          ></Image>
          <Grid>
            <Grid.Row>
              <Grid.Column width={3} />
              <Grid.Column width={2}>
                <h3>제목</h3>
              </Grid.Column>
              <Grid.Column width={7}>
                <Form>
                  <TextArea placeholder="제목을 입력해주세요." />
                </Form>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={3} />
              <Grid.Column width={2}>
                <h3>제목</h3>
              </Grid.Column>
              <Grid.Column width={7}>
                <Form>
                  <TextArea
                    placeholder="문의 내용을 작성해주세요"
                    style={{ minHeight: 300 }}
                  />
                </Form>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
              <div>
                <br></br>
                <Button content="취소" negative />
                <Button content="작성" primary />
              </div>
            </Grid.Row>
          </Grid>
        </Grid.Column>
        <Grid.Column width={2} />
      </Grid.Row>
      <style jsx>
        {`
          .test {
            width: 400px;
          }
        `}
      </style>
    </Grid>
  );
}
