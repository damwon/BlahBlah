import { Grid, Image, Button } from "semantic-ui-react";
import WordWrite from "../../component/study/wordWrite";
export default function WordNote() {
  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width={2} />
          <Grid.Column width={12}>
            <Image
              className="centered"
              src="/images/characters.PNG"
              alt="meltingPot image"
            ></Image>
            <Grid centered>
              <Grid.Row>
                <h1>Title:</h1>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={4} />
                <Grid.Column width={6}>
                  <h1>Word</h1>
                  <p>water</p>
                  <p>red</p>
                  <p>book</p>
                  <p>look</p>
                </Grid.Column>
                <Grid.Column width={6}>
                  <h1>Mean</h1>
                  <p>물</p>
                  <p>빨간색</p>
                  <p>책</p>
                  <p>보다</p>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={8} />
                <Grid.Column width={6}>
                  <WordWrite></WordWrite>
                </Grid.Column>
                <Grid.Column width={2} />
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column width={2} />
        </Grid.Row>
      </Grid>
      <style jsx>{``}</style>
    </>
  );
}
