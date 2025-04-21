import express from "express";
import { OrderControllers } from "./order.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createOrderValidationSchema, updateOrderValidationSchema } from "./order.validation";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";
const router = express.Router();
router.post(
  "/create-order",
  auth(USER_ROLE.admin, USER_ROLE.customer),
  validateRequest(createOrderValidationSchema),
  OrderControllers.createOrder
);
router.get("/overview", auth(USER_ROLE.admin), OrderControllers.getAllOverview);
router.get("/orders", auth(USER_ROLE.admin), OrderControllers.getAllOrders);
router.get(
  "/orders/:userId",
  auth(USER_ROLE.admin, USER_ROLE.customer),
  OrderControllers.getUserOrders
);
router.get("/orders", auth(USER_ROLE.admin, USER_ROLE.customer), OrderControllers.getAllOrders);
router.delete("/orders/:orderId", auth(USER_ROLE.admin), OrderControllers.deleteOrder);
router.put(
  "/order/:orderId",
  auth(USER_ROLE.admin),
  validateRequest(updateOrderValidationSchema),
  OrderControllers.changeOrderStatus
);
router.get(
  "/order/verify-payment",
  auth(USER_ROLE.admin, USER_ROLE.customer),
  OrderControllers.verifiedPayment
);

export const OrderRoutes = router;
