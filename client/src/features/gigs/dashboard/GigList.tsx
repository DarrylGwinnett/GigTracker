import { Box, Typography } from '@mui/material';
import GigCard from './GigCard';
import { useGigs } from '../../../lib/hooks/useGigs';
import { Fragment } from 'react/jsx-runtime';

export default function GigList() {
  const { gigsGroup, isLoading } = useGigs();
  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  if (!gigsGroup) {
    return <Typography>No gigs found...</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {gigsGroup.pages.map((gigs, index) => (
        <Fragment key={index}>
          {gigs.items.map((gig) => (
            <GigCard key={gig.id} gig={gig} />
          ))}
        </Fragment>
      ))}
    </Box>
  );
}
