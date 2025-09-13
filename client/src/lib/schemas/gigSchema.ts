import { z } from 'zod';
import { requiredString } from './commonValidators';


export const gigSchema = z.object({
    title: requiredString('Title'),
    genre: requiredString('Genre'),
    artist: requiredString('Artist'),
    description: requiredString('Description'),
    date: z.coerce.date({message: 'Date is required'}),
    location: z.object({
       venue: requiredString('Venue'),
       city: z.string().optional(),
       latitude: z.coerce.number(),
       longitude: z.coerce.number(),
    })
});

export type GigSchema = z.infer<typeof gigSchema>;