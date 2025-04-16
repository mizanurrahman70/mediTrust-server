import { TUser } from "../user/user.interface";
import { TMedicine } from "../medicines/medicines.interface";

export interface TProduct {
  medicine: TMedicine;
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
  user: TUser;
  products: TProduct[];
  totalPrice: number;
  status: "Pending" | "Reject" | "Processing" | "Shipped" | "Delivered";
  rejectNotes?: string;
  deliveryInfo: TDeliveryInfo;
  deliveryOptions: "Standard" | "Express" | "Pickup from Store";
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
