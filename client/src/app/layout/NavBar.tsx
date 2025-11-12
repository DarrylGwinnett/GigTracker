import { Group } from '@mui/icons-material';
import {
  AppBar,
  Box,
  CircularProgress,
  Container,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router';
import MenuItemLink from './shared/MenuItemLink';
import { useStore } from '../../lib/hooks/useStore';
import { Observer } from 'mobx-react-lite';
import { useAccount } from '../../lib/hooks/useAccount';
import UserMenu from './UserMenu';

export default function NavBar() {
  const { uiStore } = useStore();
  const { currentUser } = useAccount();

  return (
    <Box sx={{ flexGrow: 2 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundImage:
            'linear-gradient(135deg, #182a73 0%, #218ba3ff 69%, #20a7ac 89%)',
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
                <Typography variant="h4" fontWeight="bold" sx={{position: 'relative'}}>
                  GigTracker
                </Typography>
                <Observer>
                  {() =>
                    uiStore.isLoading ? (
                      <CircularProgress
                      size={24}
                      thickness={9}
                        sx={{
                          position: 'absolute',
                          color: 'white',
                          top: '30%',
                          left: '105%'
                        }}
                      />
                    ) : null
                  }
                </Observer>
              </MenuItem>
            </Box>

            <Box sx={{ display: 'flex' }}>
              <MenuItemLink to="/gigs">Gigs</MenuItemLink>
            </Box>
            <MenuItemLink to="/errors">Error Handling</MenuItemLink>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {currentUser ? (
                <>
                  <UserMenu />
                </>
              ) : (
                <>
                  {' '}
                  <MenuItemLink to="/login">Login</MenuItemLink>
                  <MenuItemLink to="/register">Register</MenuItemLink>
                </>
              )}{' '}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
