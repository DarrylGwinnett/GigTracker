import { Grid2} from "@mui/material";
import GigList from "./GigList";
import GigDetails from "../Details/GigDetails";

type Props= {
    gigs: Gig[];
    selectGig:(id:string) => void
    cancelSelectGig: () => void
    selectedGig?: Gig
}

export default function GigDashboard({gigs, selectGig, cancelSelectGig, selectedGig}: Props) {
  return (
    <Grid2 container>
      <Grid2 size={7}>
      <GigList gigs={gigs}
      selectGig={selectGig}
      />
      </Grid2>
      <Grid2 size={5}>{selectedGig && <GigDetails gig={selectedGig}
      cancelSelectGig={cancelSelectGig}
      />}</Grid2>
    </Grid2>
  );
}
