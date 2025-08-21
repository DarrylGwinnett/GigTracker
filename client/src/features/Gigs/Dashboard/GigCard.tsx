import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

type Props = {
  gig: Gig;
};

export default function GigCard({ gig }: Props) {
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
        sx={{ display: "flex", justifyContent: "space-between, pb:2" }}
      >
        <Chip label={gig.category} variant="outlined"></Chip>
        <Button size="medium" variant="contained">
          View
        </Button>
      </CardActions>
    </Card>
  );
}
