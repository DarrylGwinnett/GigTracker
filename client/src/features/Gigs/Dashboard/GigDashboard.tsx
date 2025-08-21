import { Grid2} from "@mui/material";
import GigList from "./GigList";

type Props= {
    gigs: Gig[];
}

export default function GigDashboard({gigs}: Props) {
  return (
    <Grid2 container>
      <Grid2 size={9}>
      <GigList gigs={gigs}></GigList>
      </Grid2>
    </Grid2>
  );
}
