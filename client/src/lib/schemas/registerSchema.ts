import z from 'zod';
import { requiredString } from './commonValidators';

export const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: requiredString('password'),
  displayName: requiredString('displayName')
});

export type RegisterSchema = z.infer<typeof registerSchema>;
