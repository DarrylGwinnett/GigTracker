import { Grid2 } from '@mui/material';
import GigFilters from './GigFilters.tsx';
import GigList from './GigList.tsx';

export default function GigDashboard() {
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
