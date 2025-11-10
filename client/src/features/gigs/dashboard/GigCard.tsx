import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Typography,
} from '@mui/material';
import { Link } from 'react-router';
import { AccessTime, Place } from '@mui/icons-material';
import { formatDate } from '../../../lib/util/util';
import AvatarPopover from '../../../app/layout/shared/AvatarPopover';

type Props = {
  gig: Gig;
};

export default function GigCard({ gig }: Props) {
  const label = gig.isOrganiser ? 'You Are The Organiser' : 'You are going';
  const color = gig.isOrganiser
    ? 'secondary'
    : gig.isGoing
    ? 'warning'
    : 'default';

  return (
    <Card elevation={5} sx={{ borderRadius: 3 }}>
      <Box
        display="flex"
        alignItems={'centre'}
        justifyContent={'space-between'}
      >
        <CardHeader
          avatar={
            <Avatar
              src={gig.hostImage!}
              sx={{ height: 80, width: 80 }}
            />
          }
          title={`${gig.artist} at ${gig.venue}`}
          titleTypographyProps={{ fontWeight: 'bold', fontSize: 20 }}
          subheader={
            <>
              Hosted by{''}{' '}
              <Link to={`/profiles/${gig.organiserId}`}>
                {gig.organiserDisplayName}
              </Link>
            </>
          }
        />
        <Box display="flex" flexDirection={'column'} gap={2} mr={2} p={1}>
          {(gig.isOrganiser || gig.isGoing) && (
            <Chip label={label} color={color} sx={{ borderRadius: 2 }} />
          )}
          {gig.isCancelled && (
            <Chip label="Cancelled" color="error" sx={{ borderRadius: 2 }} />
          )}
        </Box>
      </Box>
      <Divider sx={{ mb: 3 }} />
      <CardContent sx={{ p: 0 }}>
        <Box display="flex" alignItems={'centre'} mb={2} px={2}>
          <Box display="flex" flexGrow={0} alignItems={'center'}>
            <AccessTime sx={{ mr: 1 }} />
            <Typography variant="body2" noWrap>
              {formatDate(gig.date)}
            </Typography>
          </Box>
          <Place sx={{ ml: 3, mr: 1 }}></Place>
          <Typography variant="body2">{gig.venue}</Typography>
        </Box>
        <Divider />
        <Box
          display="flex"
          gap={2}
          sx={{ backgroundColor: 'grey.200', py: 3, pl: 3 }}
          p={2}
          mt={2}
        >
          {gig.attendees.map((x) => (
            <AvatarPopover profile={x} key={x.id} />
          ))}
        </Box>
      </CardContent>
      <CardContent sx={{ pb: 2 }}>
        <Typography variant="body2">{gig.description}</Typography>
        <Button
          component={Link}
          to={`/gigs/${gig.id}`}
          size="medium"
          variant="contained"
          sx={{
            display: 'flex',
            justifySelf: 'self-end',
            mt: 2,
            borderRadius: 3,
          }}
          onClick={() => {}}
        >
          View
        </Button>
      </CardContent>
    </Card>
  );
}
