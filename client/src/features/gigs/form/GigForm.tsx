import { Box, Button, Paper, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useGigs } from '../../../lib/hooks/useGigs';
import { useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { gigSchema, type GigSchema } from '../../../lib/schemas/gigSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '../../../app/layout/shared/TextInput';
import SelectInput from '../../../app/layout/shared/SelectInput';
import { genreOptions } from './GenreOptions';
import DateTimeInput from '../../../app/layout/shared/DateTimeInput';
import LocationInput from '../../../app/layout/shared/LocationInput';

export default function GigForm() {
  const { reset, handleSubmit, control } = useForm<GigSchema>({
    resolver: zodResolver(gigSchema),
    mode: 'onTouched',
  });
  const { id } = useParams();
  const { createGig, updateGig, gig, isLoadingGig } = useGigs(id);
  const navigate = useNavigate();

  useEffect(() => {
    if (gig)
      reset({
        ...gig,
        location: {
          city: gig.city,
          venue: gig.venue,
          latitude: gig.latitude,
          longitude: gig.longitude,
        },
      });
  }, [gig, reset]);

  const onSubmit = async (data: GigSchema) => {
    const { location, ...rest } = data;
    const flattenedData = {
      ...rest,
      ...location,
    };
    try {
      if (gig) {
        updateGig.mutate(
          { ...gig, ...flattenedData } as Gig,
          {
            onSuccess: () => navigate(`/gigs/${gig.id}`),
          }
        );
      } else {
        createGig.mutate(flattenedData as unknown as Gig, {
          onSuccess: (id) => navigate(`/gigs/${id}`),
        });
      }
    } catch (error) {
      console.error(error);
    }
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
        <TextInput<GigSchema> control={control} name="title" />
        <Box display="flex" gap={3}>
          <TextInput control={control} name="artist" />
          <SelectInput control={control} name="genre" items={genreOptions} />
        </Box>
        <TextInput control={control} name="description" multiline rows={3} />

        <DateTimeInput control={control} name="date" />
        <LocationInput
          control={control}
          name="location"
          label="Enter the location"
        />
        <Box display="flex" justifyContent={'end'} gap={3}>
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
