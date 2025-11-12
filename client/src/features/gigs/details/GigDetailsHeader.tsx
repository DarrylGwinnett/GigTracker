import { Card, CardMedia, Box, Typography, Chip } from '@mui/material';
import { Link } from 'react-router';
import { formatDate } from '../../../lib/util/util';
import { useGigs } from '../../../lib/hooks/useGigs';
import StyledButton from '../../../app/layout/shared/StyledButton';

type Props = {
  gig: Gig;
};

export default function GigDetailsHeader({ gig }: Props) {
  const { updateAttendance } = useGigs(gig.id);
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
        <Chip
          sx={{
            position: 'absolute',
            left: 40,
            top: 20,
            zIndex: 1000,
            borderRadius: 1,
          }}
          color="error"
          label="Cancelled"
          data-testid="gigDetailsHeader-CancelledChip"
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
          <Typography
            variant="h3"
            sx={{ fontWeight: 'bold' }}
            data-testid="gigDetailsHeader-Artist"
          >
            {gig.artist} in {gig.city}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }} data-testid="gigDetailsHeader-title">
            {gig.title}
          </Typography>
          <Typography variant="subtitle1" data-testid="gigDetailsHeader-Date">{formatDate(gig.date)}</Typography>
          <Typography variant="subtitle2" data-testid="gigDetailsHeader-Host">
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
              <StyledButton
                variant="contained"
                color={gig.isCancelled ? 'success' : 'error'}
                onClick={() => updateAttendance.mutate(gig.id)}
                disabled={updateAttendance.isPending}
                sx={{ whiteSpace: 'nowrap', mx: 2 }}
                data-testid="gigDetailsHeader-ToggleActiveStatusButton"
              >
                {gig.isCancelled ? 'Re-activate Gig' : 'Cancel Gig'}
              </StyledButton>
              <StyledButton
                variant="contained"
                sx={{ whiteSpace: 'nowrap', mx: 2 }}
                color="primary"
                component={Link}
                to={`/manage/${gig.id}`}
                disabled={gig.isCancelled}
                data-testid="gigDetailsHeader-ManageEventButton"
              >
                Manage Event
              </StyledButton>
            </>
          ) : (
            <StyledButton
              variant="contained"
              color={gig.isGoing ? 'primary' : 'info'}
              onClick={() => updateAttendance.mutate(gig.id)}
              disabled={updateAttendance.isPending || gig.isCancelled}
            >
              {gig.isGoing ? 'Cancel Attendance' : 'Join Event'}
            </StyledButton>
          )}
        </Box>
      </Box>
    </Card>
  );
}
