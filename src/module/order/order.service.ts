// @ts-nocheck
import MedicinesModel from "../medicines/medicines.model";
import { User } from "../user/user.model";
import { Order } from "./order.interface";
import OrderModel from "./order.model";
import { orderUtils } from "./order.utils";

const createOrder = async (orderDetails: any, client_ip: string) => {
  const { userId, medicines } = orderDetails;

  if (!medicines || medicines.length === 0) {
    throw new Error("No medicine specified in the order.");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  let totalPrice = 0;

  const productDetails = await Promise.all(
    medicines.map(async (item: any) => {
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

  // Update stock
  await Promise.all(
    medicines.map(async (item: any) => {
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
    userId,
    items: productDetails,
    totalPrice,
  });

  // Prepare shurjopay payload
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: "BDT",
    customer_name: user?.name,
    customer_address: user?.address || "N/A",
    customer_email: user.email,
    customer_phone: user.phone || "N/A",
    customer_city: user?.city || "N/A",
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    await OrderModel.findByIdAndUpdate(order._id, {
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });

    return payment.checkout_url;
  } else {
    await OrderModel.findByIdAndDelete(order._id);
    throw new Error("Payment failed. Order not created.");
  }
};

const calculateRevenue = async () => {
  try {
    const revenue = await OrderModel.aggregate([
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

const getAllOrders = async () => {
  return await OrderModel.find();
};

const deleteOrder = async (orderId: string) => {
  return await OrderModel.findByIdAndDelete(orderId);
};

const updateOrder = async (orderId: string, updates: Partial<Order>) => {
  return await OrderModel.findByIdAndUpdate(orderId, updates, { new: true });
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await OrderModel.findOneAndUpdate(
      { "transaction.id": order_id },
      {
        "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.method": verifiedPayment[0].method,
        "transaction.date_time": verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status === "Success"
            ? "Paid"
            : verifiedPayment[0].bank_status === "Failed"
            ? "Pending"
            : verifiedPayment[0].bank_status === "Cancel"
            ? "Cancelled"
            : "",
      }
    );
  }

  return verifiedPayment;
};

export const OrderServices = {
  createOrder,
  calculateRevenue,
  getAllOrders,
  deleteOrder,
  updateOrder,
  verifyPayment,
};
