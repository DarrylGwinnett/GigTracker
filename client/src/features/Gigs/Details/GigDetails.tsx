import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useGigs } from "../../../lib/hooks/useGigs";

export default function GigDetails() {
  const { id } = useParams();
  const { gig, isLoadingGig } = useGigs(id);
  const navigate = useNavigate();

  if (isLoadingGig) return <Typography>Loading...</Typography>;
  if (!gig) return <Typography>No gig found...</Typography>;

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
        <Button color="primary" onClick={() => navigate(`/gigs/${gig.id}`)}>
          Edit
        </Button>
        <Button color="inherit" onClick={() => navigate("/gigs")}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
