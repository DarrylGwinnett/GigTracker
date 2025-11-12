import { Button, Grid2 } from '@mui/material';
import GigFilters from './GigFilters.tsx';
import GigList from './GigList.tsx';
import { useGigs } from '../../../lib/hooks/useGigs.ts';

export default function GigDashboard() {
  const { isFetchingNextPage, fetchNextPage, hasNextPage } = useGigs();
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={8}>
        <GigList />
        <Button
          onClick={() => fetchNextPage()}
          sx={{ my: 2, float: 'right' }}
          variant="contained"
          disabled={!hasNextPage || isFetchingNextPage}
        >
          Get More Gigs
        </Button>
      </Grid2>
      <Grid2
        size={4}
        sx={{ position: 'sticky', top: 112, alignSelf: 'flex-start' }}
      >
        <GigFilters />
      </Grid2>
    </Grid2>
  );
}
