/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { OrderServices } from "./order.service";
import mongoose from "mongoose";
import catchAsync from "../../utilits/catchAsync";
import sendResponse from "../../utilits/sendResponse";
import { StatusCodes } from "http-status-codes";
import { OrderResponse } from "./order.interface";

// Create an Order
const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Order = req.body;

    const productDetails = Order.items.map((item: any) => ({
        medicine: mongoose.Types.ObjectId.isValid(item.medicine)
          ? new mongoose.Types.ObjectId(item.medicine)
          : null,
        quantity: item.quantity,
      }));
   

    const result = await OrderServices.createOrder({
        userId: Order.userId,
        medicines: productDetails,
    });

    res.status(201).json({
      message: "Order created successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Get Total Revenue
const totalRevenue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const revenue = await OrderServices.calculateRevenue();

    res.status(200).json({
      message: 'Revenue calculated successfully',
      success: true,
      data: { totalRevenue: revenue },
    });
  } catch (error) {
    next(error);
  }
}



//get all orders
const getAllOrders = catchAsync(async (req, res) => {
  const order = await OrderServices.getAllOrders();
   const response :OrderResponse<typeof order> = {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Orders retrieved successfully',
    data: order,
}
sendResponse(res, response);
});
const deleteOrder = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  try {
    const orderId = req.params.orderId;
    console.log(orderId,'orderId');
    const deletedOrder = await OrderServices.deleteOrder(orderId);
    if (deletedOrder) {
      res.status(200).json({
        message: "Order deleted successfully",
        status: true,
        data: deletedOrder,
      });
    } else {
      res.status(404).json({
        message: "Medicine not found",
        status: false,
      });
    }
  } catch (error) {
  next(error)
  }
};
const updateOrder = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
    try{
        const orderId = req.params.orderId; 
        const updates = req.body;
        const updatedOrder = await OrderServices.updateOrder(orderId, updates); 
        if (updatedOrder) {
          res.status(200).json({
            message: "Order updated successfully",
            status: true,
            data: updatedOrder,
          });
        } else {
          res.status(404).json({
            message: "Order not found",
            status: false,
          });
        }
      } catch (error) {
        next(error)
      }

    }

export const OrderControllers = {
  createOrder,
  totalRevenue,
  getAllOrders,
  deleteOrder,
  updateOrder
}