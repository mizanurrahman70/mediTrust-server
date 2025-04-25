import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import config from "../../config";
import AppError from "../../errors/AppError";

const userSchema = new Schema<TUser, UserModel>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    passwordChangedAt: { type: Date, default: null },
    status: {
      type: String,
      enum: ["active", "deactivated"],
      default: "active",
    },
    role: { type: String, enum: ["admin", "customer"], default: "customer" },
    city: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true },
    thana: { type: String, required: true, trim: true },
    postalCode: { type: Number, required: true, },
    localAddress: { type: String, required: true, trim: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const isUserExist = await User.findOne({ email: this.email });
  if (isUserExist) {
    throw new AppError(StatusCodes.CONFLICT, "This User is already Exist!");
  }
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next(); // optional
});

// findOne middleware or before findOne middleware
userSchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next(); // optional
});
// findOne middleware or before findOne middleware
userSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isStudentExist = await User.findOne(query);
  if (!isStudentExist) {
    throw new AppError(404, "User dose not exists");
  }
  next(); // optional
});

userSchema.statics.isUserExistByEmail = async function (email: string) {
  return await User.findOne({ email }).select("+password");
};

userSchema.statics.isUserExistByPhone = async function (phone: string) {
  return await User.findOne({ phone }).select("+password");
};

userSchema.statics.isUserDeactivated = async function (status: string) {
  return status === "deactivated";
};
userSchema.statics.isPasswordMatch = async function (
  plainTextPassword: string,
  hashPassword: string
) {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};
userSchema.statics.isJWTIssuedBeforePasswordChanged = async function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime = new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

const User = model<TUser, UserModel>("User", userSchema);

export default User;
