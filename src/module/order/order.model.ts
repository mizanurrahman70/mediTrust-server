import { model, Schema } from 'mongoose';
import { Order } from './order.interface';

const OrderSchema = new Schema<Order>(
  {
  
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        medicine: { type: Schema.Types.ObjectId, ref: 'medicine', required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalPrice: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'shipped', 'delivered'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export const OrderModel = model<Order>('Order', OrderSchema);
export default OrderModel;
