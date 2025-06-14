import { z } from "zod";

const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }).trim(),
    email: z.string().email({ message: "Invalid email format" }),
    phone: z.string({ required_error: "Phone Number is required" }),
    city: z.string({ required_error: "City is required" }),
    district: z.string({ required_error: "District is required" }),
    thana: z.string({ required_error: "Thana is required" }),
    postalCode: z.number({ required_error: "Thana is required" }),
    localAddress: z.string({ required_error: "Local Address is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    status: z.enum(["active", "deactivated"]).optional().default("active"),
    role: z.enum(["admin", "customer"]).optional().default("customer"),
    isDeleted: z.boolean().optional().default(false),
  }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Invalid email format" }).optional(),
    phone: z
      .string()
      .min(10, { message: "Must be a valid mobile number" })
      .max(14, { message: "Must be a valid mobile number" })
      .optional(),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z
      .string({ required_error: "Old password is required" })
      .min(6, { message: "Password must be at least 6 characters long" }),
    newPassword: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  }),
});
export const authValidation = {
  registerUserValidationSchema,
  loginUserValidationSchema,
  changePasswordValidationSchema,
};
