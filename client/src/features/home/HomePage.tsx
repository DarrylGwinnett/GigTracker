import { Group } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <Paper
      sx={{
        height: "100vh",
        color: "white",
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        flexDirection: "column",
        justifyContent: "center",
        gap: 3,
        backgroundImage:"linear-gradient(135deg, #182a73 0%, #218ba3ff 69%, #20a7ac 89%)",
        backgroundSize: "cover",
      }}
    >
      <Box
           sx={{
        color: "white",
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        gap: 3
      }}>
        <Group sx={{height:110, width: 110}}/>
        <Typography variant="h1">
          GigTracker
        </Typography>
        
      </Box>
        <Typography variant="h5" align="center">
          Welcome to GigTracker, your go-to platform for discovering and managing
          gigs.
        </Typography>
        <Button component={Link} to='/gigs' size='large' variant='contained' 
        sx={{
          alignItems: 'center',
          height: 80,
          borderRadius: 4,
          fontSize: '1.5rem',
        }}>Take Me To The Gigs</Button>
     
    </Paper>
  );
}
