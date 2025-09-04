import { Grid2, Typography } from "@mui/material";
import GigList from './GigList.tsx'
import { useGigs } from "../../../lib/hooks/useGigs";
import GigFilters from "./GigFilters.tsx";


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
