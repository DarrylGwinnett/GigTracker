import {z} from "zod";
import { requiredString } from "./commonValidators";

export const editProfileSchema = z.object({
    displayName: requiredString('Display Name'),
    bio: z.string().optional()
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;