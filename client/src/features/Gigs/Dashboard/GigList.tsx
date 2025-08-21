import { Box } from "@mui/material";
import GigCard from "./GigCard";

type Props = {
    gigs: Gig[]
}


export default function GigList({gigs}: Props) {
  return (
<Box sx={{display:'flex', flexDirection: 'column', gap:3}}>
    {gigs.map(gig =>(<GigCard key={gig.id} gig={gig} />))}
</Box>
  )
}