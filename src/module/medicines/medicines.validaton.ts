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
      location: z.string({ required_error: "Manufacture location is require" }),
    }),
    description: z.string({ required_error: "Description is required" }), // Description should not be empty
    symptoms: z.string({ required_error: "Symptoms is required" }), // Description should not be empty
    quantity: z.number().int().nonnegative("Quantity must be a positive number"), // Ensures quantity is a non-negative integer
    expiryDate: z.string({ required_error: "Expiry Date is required" }),
  }),
});
export const updateMedicineValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }).optional(),
    image: z.string({ required_error: "Product image is required" }).optional(),
    price: z.number().positive("Price must be a positive number").optional(),
    requiredPrescription: z.boolean().optional(),
    manufacturerDetails: z.object({
      name: z.string({ required_error: "Manufacture name is require" }).optional(),
      contact: z.string({ required_error: "Manufacture contact is require" }).optional(),
      location: z.string({ required_error: "Manufacture location is require" }).optional(),
    }).optional(),
    description: z.string({ required_error: "Description is required" }).optional(), // Description should not be empty
    symptoms: z.string({ required_error: "Symptoms is required" }).optional(), // Description should not be empty
    quantity: z.number().int().nonnegative("Quantity must be a positive number").optional(), // Ensures quantity is a non-negative integer
    expiryDate: z.string({ required_error: "Expiry Date is required" }).optional(),
  }),
});
