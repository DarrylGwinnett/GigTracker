import { CalendarToday, Info, Place } from '@mui/icons-material';
import { Box, Button, Divider, Grid2, Paper, Typography } from '@mui/material';
import { formatDate } from '../../../lib/util/util';
import { useState } from 'react';
import MapComponent from '../../../app/layout/shared/MapComponent';

type Props = {
  gig: Gig;
};

export default function GigDetailsInfo({ gig }: Props) {
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <Paper sx={{ mb: 2 }}>
      <Grid2 container alignItems="center" pl={2} py={1}>
        <Grid2 size={1}>
          <Info color="info" fontSize="large" />
        </Grid2>
        <Grid2 size={11}>
          <Typography data-testid="gigDetailsBody-Description">
            {gig.description}
          </Typography>
        </Grid2>
      </Grid2>
      <Divider />
      <Grid2 container alignItems="center" pl={2} py={1}>
        <Grid2 size={1}>
          <CalendarToday color="info" fontSize="large" />
        </Grid2>
        <Grid2 size={11}>
          <Typography data-testid="gigDetailsBody-Date">
            {formatDate(gig.date)}
          </Typography>
        </Grid2>
      </Grid2>
      <Divider />

      <Grid2 container alignItems="center" pl={2} py={1}>
        <Grid2 size={1}>
          <Place color="info" fontSize="large" />
        </Grid2>
        <Grid2
          size={11}
          display="flex"
          justifyContent={'space-between'}
          alignItems={'centre'}
        >
          <Typography data-testid="gigDetailsBody-Venue">
            {gig.venue}, {gig.city}
          </Typography>
          <Button
            data-testid="gigDetailsBody-MapButton"
            sx={{ whiteSpace: 'nowrap', mx: 2 }}
            onClick={() => setMapOpen(!mapOpen)}
          >
            {mapOpen ? 'Hide Map' : 'Show Map'}
          </Button>
        </Grid2>
      </Grid2>
      {mapOpen && (
        <Box sx={{ height: 400, width: '100%', display: 'block', z: 1000 }}>
          <MapComponent
            position={[gig.latitude, gig.longitude]}
            venue={gig.venue}
          />
        </Box>
      )}
    </Paper>
  );
}
