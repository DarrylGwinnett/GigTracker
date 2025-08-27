import { Box, Typography } from "@mui/material";
import GigCard from "./GigCard";
import { useGigs } from "../../../lib/hooks/useGigs";

export default function GigList() {
  const { gigs } = useGigs();
  if (!gigs) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {gigs.map((gig) => (
        <GigCard key={gig.id} gig={gig} /> 
      ))}
    </Box>
  );
}
