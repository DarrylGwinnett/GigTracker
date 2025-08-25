import { Box } from "@mui/material";
import GigCard from "./GigCard";

type Props = {
  gigs: Gig[];
  selectGig: (id: string) => void
};

export default function GigList({ gigs, selectGig }: Props) {

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {gigs.map((gig) => (
        <GigCard key={gig.id} gig={gig}  selectGig={selectGig}/>
      ))}
    </Box>
  );
}
