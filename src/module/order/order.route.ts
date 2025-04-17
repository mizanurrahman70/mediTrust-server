import express from "express";
import { OrderControllers } from "./order.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createOrderValidationSchema, updateOrderValidationSchema } from "./order.validation";
const router = express.Router();
router.post(
  "/create-order",
  validateRequest(createOrderValidationSchema),
  OrderControllers.createOrder
);
router.get("/overview", OrderControllers.getAllOverview);
router.get("/orders", OrderControllers.getAllOrders);
router.delete("/orders/:orderId", OrderControllers.deleteOrder);
router.put(
  "/order/:orderId",
  validateRequest(updateOrderValidationSchema),
  OrderControllers.changeOrderStatus
);

export const OrderRoutes = router;
