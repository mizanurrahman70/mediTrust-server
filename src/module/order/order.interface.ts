import type { Types } from "mongoose";

export interface TProduct {
  medicine: Types.ObjectId;
  quantity: number;
  prescription: string;
}
export interface TDeliveryInfo {
  name: string;
  phoneNumber: string;
  localAddress: string;
  city: string;
  district: string;
  thana: string;
  postalCode: number;
}
export interface TOrder {
  id: string;
  user: Types.ObjectId;
  products: TProduct[];
  totalPrice: number;
  status: "Pending" | "Reject" | "Processing" | "Shipped" | "Completed";
  rejectNotes?: string;
  deliveryInfo?: TDeliveryInfo;
  deliveryOptions?: "Standard" | "Express" | "Pickup from Store";
  paymentMethod: "COD" | "surjopay";
  paymentStatus: "unpaid" | "paid";
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
