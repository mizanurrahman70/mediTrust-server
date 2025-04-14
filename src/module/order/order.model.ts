import { model, Schema } from 'mongoose';
import { Order } from './order.interface';

const OrderSchema = new Schema<Order>(
  {
  
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        medicine: { type: Schema.Types.ObjectId, ref: 'Medicine', required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalPrice: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Shipped", "Completed", "Cancelled"],
      default: "Pending",
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

export const OrderModel = model<Order>('Order', OrderSchema);
export default OrderModel;
