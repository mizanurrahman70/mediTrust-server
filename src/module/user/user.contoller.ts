import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import catchAsync from "../../utilits/catchAsync";
import sendResponse from "../../utilits/sendResponse";
import { userService } from "./user.service";

const getUser = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await userService.getUser(query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Users getting successfully",
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const userId = req?.user?.id;

  const result = await userService.getMe(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: " Getting me successfully",
    data: result,
  });
});
const getSingleUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;

  const result = await userService.getSingleUser(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "User getting successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const body = req.body;

  // If a new password is provided, hash it before updating
  if (body.password) {
    const hashedPassword = await bcrypt.hash(body.password, 12); // 12 salt rounds
    body.password = hashedPassword; // Replace the plain password with the hashed one
  }

  const result = await userService.updateUser(userId, body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "User updated successfully",
    data: result,
  });
});
const changeUserStatus = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const { status } = req.body;

  const result = await userService.changeUserStatus(userId, status);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "User status change successfully",
    data: result,
  });
});

const changeUserRole = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const { role } = req.body;

  const result = await userService.changeUserRole(userId, role);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "User role change successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  await userService.deleteUser(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "User deleted successfully",
    data: {},
  });
});

export const userController = {
  getMe,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
  changeUserStatus,
  changeUserRole,
};
