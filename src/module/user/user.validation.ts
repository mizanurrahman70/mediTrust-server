import { z } from "zod";

export const updateUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Email must be provided and must be a string",
      })
      .optional(),
    email: z
      .string({
        required_error: "Email must be provided and must be a string",
      })
      .email()
      .optional(),

    phone: z
      .string({
        required_error: "Phone number must be provided and must be a string",
      })
      .optional(),
  }),
});
export const changeUserStatusValidationSchema = z.object({
  body: z.object({ status: z.enum(["active", "deactivated"]) }),
});
export const changeUserRoleValidationSchema = z.object({
  body: z.object({ role: z.enum(["admin", "customer"]) }),
});

// export const UserValidation = {
//   userValidationSchema,
// };
