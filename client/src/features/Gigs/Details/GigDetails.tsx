import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useGigs } from "../../../lib/hooks/useGigs";

type Props = {
  selectedGig: Gig;
  cancelSelectGig: () => void;
  openForm: (id: string) => void;
};

export default function GigDetails({
  selectedGig,
  cancelSelectGig,
  openForm,
}: Props) {
  const { gigs } = useGigs();
  const gig = gigs?.find((x) => x.id === selectedGig.id);
  console.log(gig?.title)
  if (!gig) return <Typography>No gig found....</Typography>;
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardMedia
        component="img"
        src={`../images/categoryImages/${selectedGig.category}.jpg`}
      />
      <CardContent>
        <Typography variant="h5">{selectedGig.title}</Typography>
        <Typography variant="h5">{selectedGig.artist}</Typography>
        <Typography>{selectedGig.date}</Typography>
        <Typography>{selectedGig.description}</Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" onClick={() => openForm(selectedGig.id)}>
          Edit
        </Button>
        <Button color="inherit" onClick={cancelSelectGig}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
