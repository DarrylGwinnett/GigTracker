import { Typography } from '@mui/material';
import { Navigate, Outlet, useLocation } from 'react-router';
import { useAccount } from '../../lib/hooks/useAccount';

export default function RequireAuth() {
  const { currentUser, loadingUserInfo } = useAccount();
  const location = useLocation();

  if (loadingUserInfo) {
    return <Typography>Loading...</Typography>;
  }
  if (!currentUser) {
    // Redirect to login page or show a message
    return <Navigate to="/login" state={{ from: location }}></Navigate>;
  }
  return <Outlet />;
}
