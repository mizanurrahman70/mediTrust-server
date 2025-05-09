import { TProduct } from "../products/products.interface";
import { TUser } from "../user/user.interface";

export interface TOrderProduct {
  product: TProduct;
  quantity: number;
  prescription: string;
}
export interface TDeliveryInfo {
  name: string;
  phoneNumber: string;
  city: string;
  district: string;
  thana: string;
  postalCode: number;
  localAddress: string;
}
export interface TOrder {
  user: TUser;
  products: TOrderProduct[];
  productNames?: string[];
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
