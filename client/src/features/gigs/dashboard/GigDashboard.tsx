import { Grid2, Typography } from "@mui/material";
import { useGigs } from "../../../lib/hooks/useGigs";
import GigFilters from "./GigFilters.tsx";
import GigList from "./GigList.tsx";


export default function GigDashboard() {
  const { gigs, isPending } = useGigs();
  if(!gigs || isPending) return <Typography>Loading...</Typography>
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={8}>
        <GigList />
      </Grid2>
      <Grid2 size={4}>        
      <GigFilters />
      </Grid2>
    </Grid2>
  );
}
