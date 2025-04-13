import { z } from "zod";

export const createMedicineValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    image: z.string({ required_error: "Product image is required" }),
    price: z.number().positive("Price must be a positive number"),
    requiredPrescription: z.boolean(),
    manufacturerDetails: z.object({
      name: z.string({ required_error: "Manufacture name is require" }),
      contact: z.string({ required_error: "Manufacture contact is require" }),
    }),
    description: z.string({ required_error: "Description is required" }), // Description should not be empty
    quantity: z.number().int().nonnegative("Quantity must be a positive number"), // Ensures quantity is a non-negative integer
    stockAvailability: z.boolean().default(true),
    expiryDate: z.date({ required_error: "Expiry Date" }),
  }),
});
