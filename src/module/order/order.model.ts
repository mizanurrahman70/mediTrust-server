import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

const OrderSchema = new Schema<TOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        medicine: { type: Schema.Types.ObjectId, ref: "Medicine", required: true },
        quantity: { type: Number, required: true, min: 1 },
        prescription: { type: String },
      },
    ],
    totalPrice: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["Pending", "Reject", "Processing", "Shipped", "Delivered"],
      default: "Pending",
    },
    rejectNotes: { type: String },
    deliveryInfo: {
      name: { type: String, required: true, trim: true },
      phoneNumber: { type: String, required: true, trim: true },
      localAddress: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      district: { type: String, required: true, trim: true },
      thana: { type: String, required: true, trim: true },
      postalCode: { type: String, required: true, trim: true, minlength: 4 },
    },
    deliveryOptions: {
      type: String,
      enum: ["Standard", "Express", "Pickup from Store"],
      default: "Standard",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "surjopay"]
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
  },
  { timestamps: true }
);

export const Order = model<TOrder>("Order", OrderSchema);
export default Order;
