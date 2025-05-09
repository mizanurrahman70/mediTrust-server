import { Types } from 'mongoose';
import { z } from 'zod';

export const reviewValidationSchema = z.object({
  body: z.object({
    reviewer: z
      .string({ required_error: 'Reviewer is required' })
      .refine((val) => Types.ObjectId.isValid(val), {
        message: 'Invalid reviewer ID',
      }),
    product: z
      .string({ required_error: 'Product is required' })
      .refine((val) => Types.ObjectId.isValid(val), {
        message: 'Invalid product ID',
      }),
    rating: z
      .number({ required_error: 'Rating is required' })
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating cannot exceed 5'),
    comment: z
      .string({ required_error: 'Comment is required' })
      .min(1, 'Comment cannot be empty')
      .max(500, 'Comment is too long'),
  }),
});
