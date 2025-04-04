import express from "express";
import { OrderControllers } from "./order.controller";
const router = express.Router();
router.post('/create-order', OrderControllers.createOrder);
router.get('/orders/revenue', OrderControllers.totalRevenue);
router.get('/orders', OrderControllers.getAllOrders);
router.delete('/orders/:orderId', OrderControllers.deleteOrder);

export const OrderRoutes = router;