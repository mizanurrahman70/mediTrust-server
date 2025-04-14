import catchAsync from "../../utilits/catchAsync";
import sendResponse from "../../utilits/sendResponse";
import { StatusCodes } from "http-status-codes";
import { authServices } from "./auth.service";


const registerUser = catchAsync(async (req, res) => {
    const userData = req.body;
    const result = await authServices.registerUserIntoDB(userData);
    const { accessToken, user } = result;
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'User Register successfully',
      data: {
        accessToken,
        user,
      },
    });
  });

  const loginUser = catchAsync(async (req, res) => {
    const result = await authServices.loginUser(req.body);
  
    const { accessToken } = result;
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'User login successfully',
      data: {
        accessToken,
      },
    });
  });
  
  const changePassword = catchAsync(async (req, res) => {
    const userData = req.user;
    const passwordData = req.body;
    const result = await authServices.changePasswordIntoDB(
      userData,
      passwordData,
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Password is changed successfully',
      data: result,
    });
  });
  



export const AuthControllers = {
    registerUser,
    loginUser,
    changePassword
}