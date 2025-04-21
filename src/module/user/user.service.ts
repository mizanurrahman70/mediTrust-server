import QueryBuilder from "../../builder/QueryBuilder";
import { TUser } from "./user.interface";
import User from "./user.model";

const getUser = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(["name", "email"])
    .paginate()
    .filter()
    .sort();
  const result = await userQuery.queryModel;
  const meta = await userQuery.countTotal();
  return { result, meta };
};
const getSingleUser = async (id: string) => {
  const result = await User.findById(id);
  return result;
};
const updateUser = async (id: string, data: TUser) => {
  const result = await User.findByIdAndUpdate(id, { ...data }, { new: true });
  return result;
};
const changeUserStatus = async (id: string, status: string) => {
  const result = await User.findByIdAndUpdate(id, { status }, { new: true });
  return result;
};
const changeUserRole = async (id: string, role: string) => {
  const result = await User.findByIdAndUpdate(id, { role }, { new: true });
  return result;
};
const deleteUser = async (id: string) => {
  const result = await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  return result;
};

export const userService = {
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
  changeUserStatus,
  changeUserRole,
};
