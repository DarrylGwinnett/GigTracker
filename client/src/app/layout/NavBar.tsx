import { Group } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuItemLink from "./shared/MenuItemLink";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 2 }}>
      <AppBar
        position="static"
        sx={{
          backgroundImage:
            "linear-gradient(535deg, #402a43 0%, #218aee 9%, #9043ad 89%)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <MenuItemLink
                to="/"               
              >
                <Group fontSize="large" />
                <Typography variant="h4" fontWeight="bold">
                  GigTracker
                </Typography>
              </MenuItemLink>
            </Box>

            <Box sx={{ display: "flex" }}>
              <MenuItemLink
                to="/gigs"
              >
                Gigs
              </MenuItemLink>
            </Box>
            <MenuItemLink
              to="/createGig"
            >
              Create Gig
            </MenuItemLink>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
