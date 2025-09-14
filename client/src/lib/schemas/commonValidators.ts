import z from "zod";

export const requiredString = (fieldName: string) =>
  z.string({required_error: `${fieldName} is required.`})
    .min(3, `${fieldName} is required`);

