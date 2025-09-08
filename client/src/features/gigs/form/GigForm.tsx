import { Box, Button, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useGigs } from "../../../lib/hooks/useGigs";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { gigSchema, type GigSchema } from "../../../lib/schemas/gigSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../app/layout/shared/TextInput";

export default function GigForm() {
  const {  reset, handleSubmit, control} = useForm<GigSchema>(
    {resolver:zodResolver(gigSchema), mode: 'onTouched'});
  const { id } = useParams();
  const { updateGig, createGig, gig, isLoadingGig } = useGigs(id);

  useEffect(() => {
    if(gig) reset(gig);
    }, [gig, reset])

  const onSubmit =  (data: GigSchema) => {
    console.log(data);
    /*event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (gig) {
      data.id = gig.id;
      await updateGig.mutateAsync(data as unknown as Gig);
      navigate(`/gigs/${gig.id}`);
    } else {
      createGig.mutate(data as unknown as Gig, {
        onSuccess: (id) => {
          navigate(`/gigs/${id}`);
        },
      });
    }
      */
  };

  if (isLoadingGig) return <Typography>Loading gig...</Typography>;
  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        {gig ? 'Edit Gig' : 'Create Gig'}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <TextInput control={control} name='title'/>
        <TextInput control={control} name='artist'/>
        <TextInput control={control} name='category'/>
        <TextInput control={control} name='description' multiline rows={3}/>
        <TextInput control={control} name='date' type='date'/>        
        <TextInput control={control} name='venue'/>
        <TextInput control={control} name='city'/>


        <Box display="flex" justifyContent={"end"} gap={3}>
          <Button color="inherit">Cancel</Button>
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
