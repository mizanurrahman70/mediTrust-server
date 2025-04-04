import { z } from 'zod';

export const orderValidationSchema = z.object({
  userId: z.string().regex(/^[a-f\d]{24}$/i, { message: "Invalid user ID" }), // Assuming user is a valid ObjectId
  medicine: z.array(
    z.object({
      medicine: z.string().regex(/^[a-f\d]{24}$/i, { message: "Invalid medicine ID" }), // Valid product ObjectId
      quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
    })
  ).nonempty({ message: "At least one medicine is required" })
});