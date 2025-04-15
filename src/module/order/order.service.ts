/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TMedicine } from "../medicines/medicines.interface";
import Medicine from "../medicines/medicines.model";
import User from "../user/user.model";
import { TOrder, TProduct } from "./order.interface";
import Order from "./order.model";
import { orderUtils } from "./order.utils"; // adjust path as needed
import AppError from "../../errors/AppError";

const createOrder = async (orderData: TOrder, client_ip: string) => {
  if (!orderData || orderData?.products?.length < 1) {
    throw new Error("No medicine specified in the order.");
  }

  const user = await User.findById(orderData?.user);
  if (!user) {
    throw new Error("User not found");
  }

  let grandTotal = 0;

  await Promise.all(
    orderData?.products?.map(async (item: TProduct) => {
      const productData = await Medicine.findById(item.medicine);
      if (!productData) {
        throw new Error(`Product not found: ${item.medicine}`);
      }

      if ((productData as TMedicine).quantity < item.quantity) {
        throw new Error(`Insufficient stock for ${productData.name}`);
      }

      const subtotal = productData.price * item.quantity;
      grandTotal += subtotal;

      return {
        medicine: productData._id,
        quantity: item.quantity,
        price: productData.price,
        subtotal,
      };
    })
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // reduce the product quantity
    // Reduce stock
    await Promise.all(
      orderData?.products?.map(async (item: TProduct) => {
        const productData = await Medicine.findById(item.medicine);
        if (productData) {
          productData.quantity -= item.quantity;
          await productData.save({ session });
        }
      })
    );

    let orderResponse = await Order.create(
      [
        {
          ...orderData,
          totalPrice:
            orderData?.deliveryOptions === "Express"
              ? grandTotal + 30
              : orderData?.deliveryOptions === "Standard"
                ? grandTotal + 20
                : grandTotal,
        },
      ],
      { session }
    );

    const shurjopayPayload = {
      amount: grandTotal,
      order_id: orderResponse[0]._id,
      currency: "BDT",
      customer_name: user.name || "MediMart",
      customer_address: "Dhaka,BD",
      customer_email: user.email || "demo@gmail.com",
      customer_phone: user?.phone || "0131646",
      customer_city: "Dhaka",
      client_ip,
    };
    if (orderData.paymentMethod === "COD") {
      await session.commitTransaction();
      await session.endSession();
      return "Order complete. Waiting for payment";
    }

    const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

    if (payment?.transactionStatus) {
      orderResponse = await orderResponse[0].updateOne(
        {
          transaction: {
            id: payment.sp_order_id,
            transactionStatus: payment.transactionStatus,
          },
        },
        { session }
      );
    }
    await session.commitTransaction();
    await session.endSession();

    return { paymentUrl: payment?.checkout_url };
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500, err.message);
  }
};

// Calculate revenue
const calculateRevenue = async () => {
  try {
    const revenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    return revenue.length > 0 ? revenue[0].totalRevenue : 0;
  } catch (error) {
    console.error("Error calculating revenue:", error);
    throw new Error("Failed to calculate revenue");
  }
};

// Verify payment
const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        paymentStatus:
          verifiedPayment[0].bank_status == 'Success'
            ? 'paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'unpaid'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'unpaid'
                : '',
      },
    );
  }

  return verifiedPayment;
};

// Get all orders
const getAllOrders = async () => {
  const data = await Order.find();
  return data;
};

// Delete order
const deleteOrder = async (orderId: string) => {
  const deletedOrder = await Order.findByIdAndDelete(orderId);
  return deletedOrder;
};

// Update order
const updateOrder = async (orderId: string, updates: Partial<TOrder>) => {
  const updatedOrder = await Order.findByIdAndUpdate(orderId, updates, { new: true });
  return updatedOrder;
};

export const OrderServices = {
  createOrder,
  calculateRevenue,
  getAllOrders,
  deleteOrder,
  updateOrder,
  verifyPayment,
};
