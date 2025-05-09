import { z } from "zod";

export const createHealthInstrumentValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    image: z.string({ required_error: "Product image is required" }),
    price: z.number().positive("Price must be a positive number"),
    quantity: z.number().int().nonnegative("Quantity must be a non-negative number"),
    brand: z.string({ required_error: "Brand is required" }),
    warrantyPeriod: z.string().optional(),
    features: z.array(z.string()).optional(),
    usageInstructions: z.string().optional(),
    manufacturerDetails: z.object({
      name: z.string({ required_error: "Manufacturer name is required" }),
      contact: z.string({ required_error: "Manufacturer contact is required" }),
      location: z.string({ required_error: "Manufacturer location is required" }),
    }),
  }),
});
