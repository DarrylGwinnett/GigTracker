import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

type Props = {
  gig: Gig;
  cancelSelectGig: () => void
};

export default function GigDetails({ gig, cancelSelectGig }: Props) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardMedia
        component="img"
        src={`../images/categoryImages/${gig.category}.jpg`}
      />
      <CardContent>
        <Typography variant="h5">{gig.title}</Typography>
        <Typography variant="h5">{gig.artist}</Typography>
        <Typography>{gig.date}</Typography>
        <Typography>{gig.description}</Typography>
      </CardContent>
      <CardActions>
        <Button color="primary">Edit</Button>
        <Button color="inherit" onClick={cancelSelectGig}>Cancel</Button>
      </CardActions>
    </Card>
  );
}
