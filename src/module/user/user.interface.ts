import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUser = {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  passwordChangedAt?: Date;
  status?: "active" | "deactivated";
  role?: "admin" | "customer";
  city: string;
  district: string;
  thana: string;
  postalCode: number;
  localAddress: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface UserModel extends Model<TUser> {
  isUserExistByEmail(email: string): Promise<TUser>;
  isUserExistByPhone(phone: string): Promise<TUser>;
  isUserDeactivated(status: string): Promise<boolean>;
  isPasswordMatch(plainTextPassword: string, hashPassword: string): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
