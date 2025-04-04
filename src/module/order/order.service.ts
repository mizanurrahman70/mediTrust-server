import MedicinesModel from "../medicines/medicines.model";
import { User } from "../user/user.model";
import { Order } from "./order.interface";
import OrderModel from './order.model';

const createOrder = async (orderDetails:any) => {
  const { userId: userId, medicines } = orderDetails;
  if (!medicines || medicines.length === 0) {
    throw new Error("No medicine specified in the order.");
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  let totalPrice = 0;

  const productDetails = await Promise.all(
    medicines.map(async (item:any) => {
      const productData = await MedicinesModel.findById(item.medicine);
      if (!productData) {
        throw new Error(`Product not found: ${item.medicine}`);
      }

      if ((productData as any).quantity < item.quantity) {
        throw new Error(`Insufficient stock for ${productData.name}`);
      }

      const subtotal = productData.price * item.quantity;
      totalPrice += subtotal;

      return {
        medicine: productData._id,
        quantity: item.quantity,
        price: productData.price,
        subtotal,
      };
    })
  );
  await Promise.all(
    medicines.map(async (item:any) => {
      const productData = await MedicinesModel.findById(item.medicine);
      if (productData) {
        (productData as any).quantity -= item.quantity;
        if ((productData as any).quantity === 0) {
          (productData as any).inStock = false;
        }
        await productData.save();
      }
    })
  );
  // Create the order
  const order = await OrderModel.create({
    userId: userId,
    items: productDetails,
    totalPrice,
  });

  return order;
};

const calculateRevenue = async () => {
  try {
    const revenue = await OrderModel.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" }
        }
      }
    ]);

    return revenue.length > 0 ? revenue[0].totalRevenue : 0;
  } catch (error) {
    console.error('Error calculating revenue:', error);
    throw new Error('Failed to calculate revenue');
  }
};

const getAllOrders = async () => {
  const data = await OrderModel.find();
  return data;
};
const deleteOrder = async (orderId: string) => {
  const deleteOrder = await OrderModel.findByIdAndDelete(orderId);
  return deleteOrder;
};
const updateOrder = async (orderId: string, updates: Partial<Order>) => {
  const updateOrder =await OrderModel.findByIdAndUpdate(orderId, updates, { new: true });
  return updateOrder;
}
export const OrderServices = {
  createOrder,
  calculateRevenue,
  getAllOrders,
  deleteOrder,
  updateOrder,
};
