import { Grid2, Typography } from "@mui/material";
import GigList from './GigList.tsx'
import { useGigs } from "../../../lib/hooks/useGigs";


export default function GigDashboard() {
  const { gigs, isPending } = useGigs();
  if(!gigs || isPending) return <Typography>Loading...</Typography>
  return (
    <Grid2 container>
      <Grid2 size={7}>
        <GigList />
      </Grid2>
      Gig Filter
      <Grid2 size={5}>
      </Grid2>
    </Grid2>
  );
}
