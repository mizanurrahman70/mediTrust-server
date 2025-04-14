import { TUser } from "./user.interface"
import User from "./user.model"


const getUser = async()=>{
    const result = await User.find()
    return result
}
const getSingleUser = async(id:string)=>{
    const result = await User.findById(id)
    return result
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateUser = async (id:string,data: TUser)=>{
    const result = await  User.findByIdAndUpdate(id, {role: 'admin'}, {new: true})
    return result
}
const deleteUser = async(id:string)=>{
    const result = await User.findByIdAndDelete(id)
    return result 
}
export const userService ={

    getUser,
    getSingleUser,
    updateUser,
    deleteUser
}