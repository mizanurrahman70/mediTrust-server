import { StatusCodes } from "http-status-codes";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { TUser } from "../user/user.interface";
import User from "../user/user.model";
import { createToken } from "./auth.utils";
import { TLogin } from "./auth.interface";
import AppError from "../../errors/AppError";

const registerUserIntoDB = async (payload: TUser) => {
  if (await User.isUserExistByEmail(payload?.email)) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'The email is already exist!');
  }
  if (await User.isUserExistByPhone(payload?.phone as string)) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'The phone number is already exist!');
  }
  const user = await User.create(payload);
  const jwtPayload = {
    email: user.email,
    role: user.role!,
    id: user._id,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.access_token_expiresIn as string
  );

  return {
    user,
    accessToken,
  };
};

const loginUser = async (payload: TLogin) => {
const user = await User.findOne({$or:[{email:payload?.email},{phone:payload?.phone}]}).select('+password');

if(!user){
  throw new AppError(StatusCodes.NOT_FOUND, 'User does not Exist');
}  

if (user.isDeleted) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User does not Exist');
  }

  if (await User.isUserDeactivated(user.status!)) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User is deactivated!");
  }

  if (!(await User.isPasswordMatch(payload?.password, user?.password))) {
    throw new AppError(StatusCodes.FORBIDDEN, "Wrong Password!");
  }
  const jwtPayload = {
    email: user.email,
    role: user.role!,
    id: user._id,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.access_token_expiresIn as string
  );

  return {
    accessToken,
  };
};

const changePasswordIntoDB = async (
  userData: JwtPayload,
  payload: {
    confirmPassword: string;
    newPassword: string;
    oldPassword: string;
  }
) => {
  const isUserExist = await User.isUserExistByEmail(userData?.email);
  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "User is not Exist");
  }
  if (isUserExist.isDeleted === true) {
    throw new AppError(StatusCodes.NOT_FOUND, "User does not Exist");
  }
  if (await User.isUserDeactivated(isUserExist.status!)) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User is deactivated!");
  }
  if (!(await User.isPasswordMatch(payload?.oldPassword, isUserExist?.password))) {
    throw new AppError(StatusCodes.FORBIDDEN, "Wrong Password!");
  }

  if (payload?.newPassword !== payload?.confirmPassword) {
    throw new AppError(StatusCodes.BAD_REQUEST, "New Password and Confirm Password is not Match!");
  }

  

  const updatedPassword = await bcrypt.hash(
    payload?.newPassword as string,
    Number(config.bcrypt_salt_rounds)
  );

  await User.findOneAndUpdate(
    { email: userData?.email, role: userData?.role },
    {
      $set: {
        password: updatedPassword,
        passwordChangedAt: new Date(),
      },
    },
    { new: true }
  );

  return null;
};



export const authServices = {
  loginUser,
  changePasswordIntoDB,
  registerUserIntoDB,
};
