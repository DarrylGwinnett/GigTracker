import { Box, Typography } from '@mui/material';
import GigCard from './GigCard';
import { useGigs } from '../../../lib/hooks/useGigs';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

const GigList = observer(function GigList() {
  const { gigsGroup, isLoading, hasNextPage, fetchNextPage } = useGigs();
  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  if (!gigsGroup) {
    return <Typography>No gigs found...</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {gigsGroup.pages.map((gigs, index) => (
        <Box
          key={index}
          ref={index === gigsGroup.pages.length - 1 ? ref : null}
          display="flex"
          flexDirection={'column'}
          gap={3}
        >
          {gigs.items.map((gig) => (
            <GigCard key={gig.id} gig={gig} />
          ))}
        </Box>
      ))}
    </Box>
  );
})

export default GigList;
