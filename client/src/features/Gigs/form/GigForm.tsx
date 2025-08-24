import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";

type Props = {
  closeForm: () => void;
  gig?: Gig;
  submitForm: (gig: Gig) => void
};

export default function GigForm({ closeForm, gig, submitForm }: Props) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    if(gig) data.id = gig.id
    submitForm(data as unknown as Gig)
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
          type="datetime-local"
          defaultValue={gig?.date}
        />
        <TextField name="city" label="City" defaultValue={gig?.city} />
        <TextField name="venue" label="Venue" defaultValue={gig?.venue} />
        <Box display="flex" justifyContent={"end"} gap={3}>
          <Button color="inherit" onClick={closeForm}>
            Cancel
          </Button>
          <Button color="success" variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
