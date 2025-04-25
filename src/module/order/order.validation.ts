import { z } from "zod";

// Single product schema
export const productSchema = z.object({
  medicine: z.string({ required_error: "Medicine is required" }),
  quantity: z.number({ required_error: "Quantity is required" }).int(),
  prescription: z.string().optional(),
});

// Delivery info schema
export const deliveryInfoSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  phoneNumber: z.string({ required_error: "Phone number is required" }),
  localAddress: z.string({ required_error: "local address is required" }),
  city: z.string({ required_error: "City is required" }),
  district: z.string({ required_error: "District is required" }),
  thana: z.string({ required_error: "Thana is required" }),
  postalCode: z.number({ required_error: "Postal code is required" }).int(),
});

// Transaction schema
export const transactionSchema = z
  .object({
    id: z.string().optional(),
    transactionStatus: z.string().optional(),
    bank_status: z.string().optional(),
    sp_code: z.string().optional(),
    sp_message: z.string().optional(),
    method: z.string().optional(),
    date_time: z.string().optional(),
  })
  .optional();

// Order schema
export const createOrderValidationSchema = z.object({
  body: z.object({
    user: z.string({ required_error: "User id is required" }),
    products: z.array(productSchema, { required_error: "Products is required" }),
    productNames: z.array(z.string({ required_error: "Product names is required" })),
    deliveryInfo: deliveryInfoSchema,
    deliveryOptions: z.enum(["Standard", "Express", "Pickup from Store"]),
    paymentMethod: z.enum(["COD", "surjopay"]),
  }),
});

export const updateOrderValidationSchema = z.object({
  status: z
    .enum(["Pending", "Reject", "Processing", "Shipped", "Delivered"])
    .default("Pending")
    .optional(),
  rejectNotes: z.string().optional(),
});
