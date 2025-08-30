import { Group } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "./shared/MenuItemLink";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 2 }}>
      <AppBar
        position="static"
        sx={{
          backgroundImage:
            "linear-gradient(135deg, #182a73 0%, #218ba3ff 69%, #20a7ac 89%)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <MenuItem
                component={NavLink}
                to="/"
                sx={{ display: "flex", gap: 2 }}
              >
                <Group fontSize="large" />
                <Typography variant="h4" fontWeight="bold">
                  GigTracker
                </Typography>
              </MenuItem>
            </Box>

            <Box sx={{ display: "flex" }}>
              <MenuItemLink to="/gigs">Gigs</MenuItemLink>
            </Box>
            <MenuItemLink to="/createGig">Create Gig</MenuItemLink>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
