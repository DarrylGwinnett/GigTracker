import { Grid2} from "@mui/material";
import GigList from "./GigList";
import GigDetails from "../Details/GigDetails";

type Props= {
    gigs: Gig[];
}

export default function GigDashboard({gigs}: Props) {
  return (
    <Grid2 container>
      <Grid2 size={7}>
      <GigList gigs={gigs}/>
      </Grid2>
      <Grid2 size={5}>{gigs[0] && <GigDetails gig={gigs[0]}/>}</Grid2>
    </Grid2>
  );
}
