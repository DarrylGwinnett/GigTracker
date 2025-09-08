import { z } from 'zod';

const requiredString = (fieldName: string) =>
  z.string({error: `${fieldName} is required.`})
    .min(3, `${fieldName} is required`);


export const gigSchema = z.object({
    title: requiredString('Title'),
    genre: requiredString('Genre'),
    artist: requiredString('Artist'),
    description: requiredString('Description'),
    date: z.coerce.date({message: 'Date is required'}) as unknown as Date,
    city: requiredString('City'),
    venue: requiredString('Venue'),

});

export type GigSchema = z.infer<typeof gigSchema>;