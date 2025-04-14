import type { Types } from "mongoose";
export interface Order {
  id: string;
  userId: Types.ObjectId;
  items: { medicine: Types.ObjectId; quantity: number }[];
  totalPrice: number;
  rejectNotes?: string;
  status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
}
export interface OrderResponse<T> {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
}
