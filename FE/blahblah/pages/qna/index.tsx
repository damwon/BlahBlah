import Image from "next/image"
import { Grid } from "semantic-ui-react"
export default function QnA() {
  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width = {4}>
          <Image src="/images/meltingPot.PNG" width="1000px" height="200px" className="item" data-aos="fade-up" alt="meltingPot image"></Image>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      
    </>
  )
}