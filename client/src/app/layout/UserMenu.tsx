import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useAccount } from '../../lib/hooks/useAccount';
import { Add, Logout, Person } from '@mui/icons-material';
import { Link } from 'react-router';

export default function UserMenu() {
  const { currentUser, logoutUser } = useAccount();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        color="inherit"
        size="large"
        data-testid="user-menu-button"
        sx={{ fontSize: '1.2rem' }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar />
          {currentUser?.displayName}{' '}
        </Box>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem component={Link} to="/createGig" onClick={handleClose}>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText>Create Gig</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to="/profile" onClick={handleClose}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            logoutUser.mutate();
            handleClose();
          }}
        >
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
