import { Request, Response } from "express";
import catchAsync from "../../utilits/catchAsync";
import { authService } from "./auth.service";
import sendResponse from "../../utilits/sendResponse";
import { StatusCodes } from "http-status-codes";

const register = catchAsync(async(req: Request, res: Response)=>{
    const result = await authService.register(req.body);

    sendResponse(res,{
        statusCode: StatusCodes.CREATED,
        status: true,
        message: "User registered successfully",
        data: result
    })
})
const login = catchAsync(async(req: Request, res: Response)=>{
    const result = await authService.login(req.body);

    sendResponse(res,{
        statusCode: StatusCodes.ACCEPTED,
        status: true,
        message: "User logged in successfully",
        data: result
    })
})




export const AuthControllers = {
    register,
    login
}