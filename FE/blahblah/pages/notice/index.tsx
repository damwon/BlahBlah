import { Grid, Image, Pagination } from "semantic-ui-react";
export default function Notice() {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={4} />
        <Grid.Column width={8}>
          <Image
            className="centered"
            src="/images/notice2.PNG"
            alt="notice image"
          ></Image>
          <br></br>
          <Grid centered>
            <Grid.Row>
              <hr></hr>
              <Grid.Column width={3} className="text-center text-bold">
                <p>번호</p>
              </Grid.Column>
              <Grid.Column width={10} className="text-center text-bold">
                <p>제목</p>
              </Grid.Column>
              <Grid.Column width={3} className="text-center text-bold">
                <p>등록일</p>
              </Grid.Column>
              <hr></hr>
            </Grid.Row>
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
          </Grid>
        </Grid.Column>
        <Grid.Column width={4} />
      </Grid.Row>
      <style jsx>
        {`
          .text-center {
            text-align: center;
          }
          p {
            font-size: medium;
            font-weight: 800;
          }
        `}
      </style>
    </Grid>
  );
}
