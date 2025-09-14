import { Box, Typography } from '@mui/material';
import GigCard from './GigCard';
import { useGigs } from '../../../lib/hooks/useGigs';

export default function GigList() {
  const { gigs, isLoading } = useGigs();
  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  if (!gigs) {
    return <Typography>No activities found...</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {gigs.map((gig) => (
        <GigCard key={gig.id} gig={gig} />
      ))}
    </Box>
  );
}
