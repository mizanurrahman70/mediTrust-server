import { model, Schema } from "mongoose";
import { TContact } from "./contact.interface";

const contactSchema = new Schema<TContact>(
  {
    name: { type: String, required: true },
    contact: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const ContactUs = model<TContact>("contact", contactSchema);
