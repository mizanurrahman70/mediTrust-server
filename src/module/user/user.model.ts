import { IUser } from "./user.interface"; 
import bcrypt from 'bcrypt';
import config from "../../config";
import mongoose, { Schema ,model} from "mongoose";
 const userSchema = new Schema<IUser>(
    {
      
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: String, enum: ["admin", "customer"], default: "customer" },
      phone: { type: String, required: false },
    },{
        timestamps: true,
        versionKey: false,
    }
 )

 userSchema.pre('save', async function (this: IUser, next :any) {
    const user= this;
    user.password = await bcrypt.hash(user.password, 
       Number(config.bcrypt_salt_rounds) || 10
    )
    next();
 })
 userSchema.post('save', function (doc:any,next:any){
    doc.password ='';
    next();
 })
 export const User = model<IUser>('User', userSchema);