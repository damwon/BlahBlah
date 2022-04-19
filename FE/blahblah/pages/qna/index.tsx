import { Grid, Image, Button, Pagination } from "semantic-ui-react";

export default function QnA() {
  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width={2} />
          <Grid.Column width={12}>
            <Grid.Row>
              <Image
                className="centered"
                src="/images/meltingPot.PNG"
                alt="meltingPot image"
              ></Image>
            </Grid.Row>
            <br></br>
            <br></br>
            <Grid centered>
              <Grid.Row>
                <Grid.Column width={12}></Grid.Column>
                <Grid.Column width={4}>
                  <Button basic>문의하기</Button>
                </Grid.Column>
              </Grid.Row>

              <div>
                <Pagination
                  boundaryRange={0}
                  ellipsisItem={null}
                  firstItem={null}
                  lastItem={null}
                  siblingRange={2}
                  totalPages={5}
                  // onClick={}
                  activePage={1}
                />
              </div>
            </Grid>
          </Grid.Column>

          <Grid.Column width={2} />
        </Grid.Row>
      </Grid>
    </>
  );
}
