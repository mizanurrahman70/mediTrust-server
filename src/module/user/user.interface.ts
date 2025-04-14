import { Types } from "mongoose";
export type IUser = {
    _id :string | Types.ObjectId;
    email: string;
    password: string;
    role: "customer" | "admin";
    status: 'in-progress' | 'blocked';
    phone?: string;
}