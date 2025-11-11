import { Person } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Typography,
} from '@mui/material';
import { Link } from 'react-router';

type Props = {
  profile: Profile;
};

export default function ProfileCard({ profile }: Props) {
  return (
    <Link to={`/profiles/${profile.id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{ borderRadius: 3, p: 3, maxWidth: 250, textDecoration: 'none' }}
        elevation={4}
      >
        <CardMedia
          component={'img'}
          src={profile?.imageUrl || `images/categoryImages/drinks.jpg`}
          sx={{ width: '100%', zIndex: 50 }}
          alt={profile.displayName + ' image'}
        />
        <CardContent>
          <Box display="flex" flexDirection='column' gap={1}>
            <Typography variant="h5">{profile.displayName}</Typography>
            {profile.following && (
              <Chip
                size="small"
                label="following"
                color="secondary"
                variant="outlined"
              />
            )}
          </Box>
        </CardContent>
        <Divider sx={{ mb: 2 }} />
        <Box
          display="flex"
          alignItems={'centre'}
          gap={1}
          justifyContent={'start'}
        >
          <Person />
          <Typography sx={{ ml: 1 }}>{profile.followersCount} followers</Typography>
        </Box>
      </Card>
    </Link>
  );
}
