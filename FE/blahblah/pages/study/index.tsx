import { Grid, Image, Pagination } from "semantic-ui-react";
export default function Study() {
  return (
    <>
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={2} />
          <Grid.Column width={12}>
            <Image
              className="centered"
              src="/images/study.PNG"
              alt="meltingPot image"
            ></Image>
            <div className="cent">
              <h1>hi</h1>
              <br></br>
            </div>
            <Grid centered>
              <Grid.Row>
                <Grid.Column width={2} />
                <Grid.Column width={3}>
                  <h1 className="cent">word note</h1>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
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
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={3}>
                  <h1 className="cent">record note</h1>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
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
                </Grid.Column>
                <Grid.Column width={1} />
                <Grid.Column width={4}>
                  <h1 className="cent">my note</h1>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
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
                </Grid.Column>
                <Grid.Column width={2} />
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column width={2} />
        </Grid.Row>
      </Grid>

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
