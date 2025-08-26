import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";
import { useGigs } from "../../../lib/hooks/useGigs";



export default function GigForm() {
  const { updateGig, createGig } = useGigs();
  const gig = {} as Gig;
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (gig) {
      data.id = gig.id;
      await updateGig.mutateAsync(data as unknown as Gig);
    }
    else{
      await createGig.mutateAsync(data as unknown as Gig)
    }
  };

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Create Activity
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <TextField name="title" label="Title" defaultValue={gig?.title} />
        <TextField
          name="category"
          label="Category"
          defaultValue={gig?.category}
        />
        <TextField name="artist" label="Artist" defaultValue={gig?.artist} />
        <TextField
          name="description"
          label="Description"
          multiline
          rows="3"
          defaultValue={gig?.description}
        />
        <TextField
          name="date"
          label="Date"
          type="date"
          defaultValue={gig?.date ?
            new Date(gig.date).toISOString().split('T')[0] 
            : new Date().toISOString().split('T')[0]
          }
        />
        <TextField name="city" label="City" defaultValue={gig?.city} />
        <TextField name="venue" label="Venue" defaultValue={gig?.venue} />
        <Box display="flex" justifyContent={"end"} gap={3}>
          <Button color="inherit" >
            Cancel
          </Button>
          <Button
            color="success"
            variant="contained"
            type="submit"
            disabled={updateGig.isPending}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
