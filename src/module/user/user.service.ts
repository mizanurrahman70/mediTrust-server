import { IUser } from "./user.interface";
import { User } from "./user.model";
const createUser = async (payload: IUser) => {
    payload.role === 'admin';
    const result = await User.create(payload);
    return result
}
const getUser = async()=>{
    const result = await User.find()
    return result
}
const getSingleUser = async(id:string)=>{
    const result = await User.findById(id)
    return result
}
const updateUser = async (id:string,data: IUser)=>{
    const result = await  User.findByIdAndUpdate(id, {role: 'admin'}, {new: true})
    return result
}
const deleteUser = async(id:string)=>{
    const result = await User.findByIdAndDelete(id)
    return result 
}
export const userService ={
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
}