import { Card, Badge, CardMedia, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router';
import { formatDate } from '../../../lib/util/util';

type Props = {
  gig: Gig;
};

export default function GigDetailsHeader({ gig }: Props) {
  const loading = false;

  return (
    <Card
      sx={{
        position: 'relative',
        mb: 2,
        backgroundColor: 'transparent',
        overflow: 'hidden',
      }}
    >
      {gig.isCancelled && (
        <Badge
          sx={{ position: 'absolute', left: 40, top: 20, zIndex: 1000 }}
          color="error"
          badgeContent="Cancelled"
        />
      )}
      <CardMedia
        component="img"
        height="300"
        image={`/images/categoryImages/music.jpg`}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          color: 'white',
          padding: 2,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          background:
            'linear-gradient(to top, rgba(0, 0, 0, 1.0), transparent)',
          boxSizing: 'border-box',
        }}
      >
        {/* Text Section */}
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
            {gig.artist} in {gig.city}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {gig.title}
          </Typography>
          <Typography variant="subtitle1">{formatDate(gig.date)}</Typography>
          <Typography variant="subtitle2">
            Hosted by{' '}
            <Link
              to={`/profiles/${gig.organiserId}`}
              style={{ color: 'white', fontWeight: 'bold' }}
            >
              {gig.organiserDisplayName}
            </Link>
          </Typography>
        </Box>

        {/* Buttons aligned to the right */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          {gig.isOrganiser ? (
            <>
              <Button
                variant="contained"
                color={gig.isCancelled ? 'success' : 'error'}
                onClick={() => {}}
                sx={{ whiteSpace: 'nowrap', mx: 2 }}
              >
                {gig.isCancelled ? 'Re-activate Gig' : 'Cancel Gig'}
              </Button>
              <Button
                variant="contained"
                sx={{ whiteSpace: 'nowrap', mx: 2 }}
                color="primary"
                component={Link}
                to={`/manage/${gig.id}`}
                disabled={gig.isCancelled}
              >
                Manage Event
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color={gig.isGoing ? 'primary' : 'info'}
              onClick={() => {}}
              disabled={gig.isCancelled || loading}
            >
              {gig.isGoing ? 'Cancel Attendance' : 'Join Event'}
            </Button>
          )}
        </Box>
      </Box>
    </Card>
  );
}
