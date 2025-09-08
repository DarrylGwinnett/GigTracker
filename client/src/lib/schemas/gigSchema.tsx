import { z } from 'zod';

const requiredString = (fieldName: string) =>
  z.string({error: `${fieldName} is required.`})
    .min(3, `${fieldName} is required`);


export const gigSchema = z.object({
    title: requiredString('Title'),
    category: requiredString('Category'),
    artist: requiredString('Artist'),
    description: requiredString('Description'),
    date: requiredString('Date'),
    city: requiredString('City'),
    venue: requiredString('Venue'),

});

export type GigSchema = z.infer<typeof gigSchema>;