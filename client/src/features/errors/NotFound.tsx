import { SearchOff } from "@mui/icons-material";
import { Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <Paper sx={{ height: 400, display: 'flex', justifyContent: 'center', p: 6, flexDiration: 'column', alignItems: 'center' }}>
        <SearchOff />
        <Typography variant="h3">Oooops - we couldn't find what you were looking for</Typography>
        <Button fullWidth size="large" component={Link} to='/gigs' sx={{ mt: 3 }} variant="contained">
            Go back to Gigs page
        </Button>

    </Paper>
  )
}