import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { useGigs } from "../../../lib/hooks/useGigs";

type Props = {
  gig: Gig;
};

export default function GigCard({ gig }: Props) {
 const { deleteGig } = useGigs();

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
            onClick={() => {}}
          >
            View
          </Button>
          <Button
            size="medium"
            variant="contained"
            color="error"
            onClick={async () => await deleteGig.mutateAsync(gig.id)}
            disabled={deleteGig.isPending}
          >
            Delete
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
