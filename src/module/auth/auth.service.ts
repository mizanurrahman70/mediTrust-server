import { IUser } from "../user/user.interface"
import { User } from "../user/user.model"
import bcrypt from 'bcrypt'
const register = async (payload: IUser) => {   
    const result = await User.create(payload);
    return result
}
const login = async (payload: {email:string;password:string}) => {
    const  user = await User.findOne({email: payload?.email}).select('+password');
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordMatch = await bcrypt.compare(payload.password,user.password);
    if (!isPasswordMatch) {
      throw new Error('Password is incorrect');
    }
    return user;
}
export const authService = {
    register,
login}