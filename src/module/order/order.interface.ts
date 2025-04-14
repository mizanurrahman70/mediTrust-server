import type { Types } from "mongoose";
export interface Order {
  id: string;
  userId: Types.ObjectId;
  items: { medicine: Types.ObjectId; quantity: number }[];
  status: "pending" | "confirmed" | "reject" | "shipped" | "delivered";
  totalPrice: number;
  rejectNotes?: string;
  
  paymentMethod: string;
  deliveryOption: string;
}
export interface OrderResponse<T> {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
}
