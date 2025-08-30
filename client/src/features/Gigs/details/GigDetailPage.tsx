import { Grid2, Typography } from "@mui/material";
import {  useParams } from "react-router";
import { useGigs } from "../../../lib/hooks/useGigs";
import GigDetailsHeader from "./GigDetailsHeader";
import GigDetailsInfo from "./GigDetailsInfo";
import GigDetailsChat from "./GigDetailsChat";

export default function GigDetailPage() {
  const { id } = useParams();
  const { gig, isLoadingGig } = useGigs(id);

  if (isLoadingGig) return <Typography>Loading...</Typography>;
  if (!gig) return <Typography>No gig found...</Typography>;

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={8}>
      <GigDetailsHeader gig={gig}/>
        <GigDetailsInfo gig={gig}/>
        <GigDetailsChat />
      </Grid2>
      <Grid2 size={4}></Grid2>
    </Grid2>
  );
}
