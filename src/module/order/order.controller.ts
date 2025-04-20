import { NextFunction, Request, Response } from "express";
import { OrderServices } from "./order.service";
import catchAsync from "../../utilits/catchAsync";
import sendResponse from "../../utilits/sendResponse";
import { StatusCodes } from "http-status-codes";
import { OrderResponse } from "./order.interface";

// Create an Order
const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = req.body;
    const result = await OrderServices.createOrder(order, req.ip!);

    res.status(201).json({
      message: "Order created successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAllOrders = catchAsync(async (req, res) => {
  const order = await OrderServices.getAllOrders(req?.query);
  const response: OrderResponse<typeof order> = {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Orders retrieved successfully",
    data: order,
  };
  sendResponse(res, response);
});
const getUserOrders = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const order = await OrderServices.getUserOrders(userId);
  const response: OrderResponse<typeof order> = {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User Orders retrieved successfully",
    data: order,
  };
  sendResponse(res, response);
});
// Get Total Revenue
const getAllOverview = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllOverview();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Overview getting successfully",
    data: result,
  });
});
const deleteOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const orderId = req.params.orderId;
    const deletedOrder = await OrderServices.deleteOrder(orderId);
    if (deletedOrder) {
      res.status(200).json({
        message: "Order deleted successfully",
        success: true,
        data: deletedOrder,
      });
    } else {
      res.status(404).json({
        message: "Medicine not found",
        success: false,
      });
    }
  } catch (error) {
    next(error);
  }
};
const changeOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orderId = req.params.orderId;
    const updates = req.body;
    const updatedOrder = await OrderServices.changeOrderStatus(orderId, updates);

    res.status(200).json({
      message: "Order status change successfully",
      success: true,
      data: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};

const verifiedPayment = catchAsync(async (req, res) => {
  const { order_id } = req.query;
  const result = await OrderServices.verifyPayment(order_id as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Payment verify successfully",
    data: result,
  });
});
export const OrderControllers = {
  createOrder,
  getAllOverview,
  getAllOrders,
  deleteOrder,
  changeOrderStatus,
  verifiedPayment,
  getUserOrders,
};
