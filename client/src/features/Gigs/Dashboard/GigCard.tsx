import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

type Props = {
  gig: Gig;
  selectGig: (id: string) => void;
  deleteGig: (id: string) => void;
};

export default function GigCard({ gig, selectGig, deleteGig }: Props) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5"> {gig.title}</Typography>

        <Typography sx={{ color: "text.secondary" }}> {gig.artist}</Typography>
        <Typography sx={{ color: "text.secondary" }}> {gig.date}</Typography>
        <Typography sx={{ color: "text.secondary" }}>
          {" "}
          {gig.description}
        </Typography>
        <Typography sx={{ color: "text.secondary" }}> {gig.venue}</Typography>
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}
      >
        <Chip label={gig.category} variant="outlined"></Chip>
        <Box display='flex' gap={3}>
          <Button
            size="medium"
            variant="contained"
            onClick={() => selectGig(gig.id)}
          >
            View
          </Button>
          <Button
            size="medium"
            variant="contained"
            color="error"
            onClick={() => deleteGig(gig.id)}
          >
            Delete
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
