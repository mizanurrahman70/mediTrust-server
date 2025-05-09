import validateRequest from "../../middlewares/validateRequest";
import { productController } from "./products.controller";
import express from "express";
import {
  createMedicineValidationSchema,
  updateMedicineValidationSchema,
} from "./products.validaton";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";
const router = express.Router();
// Define routes
router.post(
  "/product",
  auth(USER_ROLE.admin),
  validateRequest(createMedicineValidationSchema),
  productController.createProduct
);
router.get("/products", productController.getAllProducts);
router.get("/product/:productId", productController.getProductById);
router.put(
  "/product/:productId",
  auth(USER_ROLE.admin),
  validateRequest(updateMedicineValidationSchema),
  productController.updateProduct
);
router.delete("/product/:productId", auth(USER_ROLE.admin), productController.deleteProduct);

export const medicineRoutes = router;
