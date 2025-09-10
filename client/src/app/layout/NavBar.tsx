import { Group } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Container,
  LinearProgress,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router';
import MenuItemLink from './shared/MenuItemLink';
import { useStore } from '../../lib/hooks/useStore';
import { Observer } from 'mobx-react-lite';
import { useAccount } from '../../lib/hooks/useAccount';

export default function NavBar() {
  const { uiStore } = useStore();
  const { currentUser } = useAccount();

  return (
    <Box sx={{ flexGrow: 2 }}>
      <AppBar
        position="static"
        sx={{
          backgroundImage:
            'linear-gradient(135deg, #182a73 0%, #218ba3ff 69%, #20a7ac 89%)',
          position: 'relative',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <MenuItem
                component={NavLink}
                to="/"
                sx={{ display: 'flex', gap: 2 }}
              >
                <Group fontSize="large" />
                <Typography variant="h4" fontWeight="bold">
                  GigTracker
                </Typography>
              </MenuItem>
            </Box>

            <Box sx={{ display: 'flex' }}>
              <MenuItemLink to="/gigs">Gigs</MenuItemLink>
            </Box>
            <MenuItemLink to="/createGig">Create Gig</MenuItemLink>
            <MenuItemLink to="/errors">Error Handling</MenuItemLink>
           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>{currentUser ? (
            <>
            <Typography variant="h6">Welcome, {currentUser.displayName}</Typography>
               <MenuItemLink to="/login">Logout</MenuItemLink>
               </>
          ) : (
           <> <MenuItemLink to="/login">Login</MenuItemLink>
            <MenuItemLink to="/register">Register</MenuItemLink></>
           )} </Box>
          </Toolbar>
          <Observer>
            {() =>
              uiStore.isLoading ? (
                <LinearProgress
                  color="secondary"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                  }}
                />
              ) : null
            }
          </Observer>
        </Container>
      </AppBar>
    </Box>
  );
}
