
import { CalendarToday, Info, Place } from "@mui/icons-material";
import { Divider, Grid2, Paper, Typography } from "@mui/material";

type Props = {
    gig: Gig;
}

export default function GigDetailsInfo({gig}: Props) {
    return (
        <Paper sx={{ mb: 2 }}>

            <Grid2 container alignItems="center" pl={2} py={1}>
                <Grid2 size={1}>
                    <Info color="info" fontSize="large" />
                </Grid2>
                <Grid2 size={11}>
                    <Typography>{gig.description}</Typography>
                </Grid2>
            </Grid2>
            <Divider />
            <Grid2 container alignItems="center" pl={2} py={1}>
                <Grid2 size={1}>
                    <CalendarToday color="info" fontSize="large" />
                </Grid2>
                <Grid2 size={11}>
                    <Typography>{gig.date}</Typography>
                </Grid2>
            </Grid2>
            <Divider />

            <Grid2 container alignItems="center" pl={2} py={1}>
                <Grid2 size={1}>
                    <Place color="info" fontSize="large" />
                </Grid2>
                <Grid2 size={11}>
                    <Typography>
                        {gig.venue}, {gig.city}
                    </Typography>
                </Grid2>
            </Grid2>
        </Paper>
    )
}
