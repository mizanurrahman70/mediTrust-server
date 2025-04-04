import type {Types } from "mongoose";
export interface Order {
    id: string;
    userId: Types.ObjectId;
    items: { medicine: Types.ObjectId; quantity: number }[];
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
    totalPrice: number;
    paymentMethod: string;
    deliveryOption: string;
}