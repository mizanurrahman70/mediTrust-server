import { IUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import { Schema, model } from "mongoose";
const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "customer"], default: "customer" },
    phone: { type: String, required: false },
    status: { type: String, enum: ["in-progress", "blocked"], default: "in-progress" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
  next();
});

// post middleware or after save middleware
userSchema.post("save", async function (doc, next) {
  doc.password = ""; // remove the password in response
  next(); // optional
});
export const User = model<IUser>("User", userSchema);
