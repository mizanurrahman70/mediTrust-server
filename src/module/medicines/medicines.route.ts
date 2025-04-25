import validateRequest from "../../middlewares/validateRequest";
import { medicineController } from "./medicines.controller";
import express from "express";
import {
  createMedicineValidationSchema,
  updateMedicineValidationSchema,
} from "./medicines.validaton";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";
const router = express.Router();
// Define routes
router.post(
  "/medicine",
  auth(USER_ROLE.admin),
  validateRequest(createMedicineValidationSchema),
  medicineController.createMedicine
);
router.get("/medicines", medicineController.getAllMedicines);
router.get("/medicine/:medicineId", medicineController.getMedicineById);
router.put(
  "/medicine/:medicineId",
  auth(USER_ROLE.admin),
  validateRequest(updateMedicineValidationSchema),
  medicineController.updateMedicine
);
router.delete("/medicine/:medicineId", auth(USER_ROLE.admin), medicineController.deleteMedicine);

router.post("/get-cart-medicines", auth(USER_ROLE.customer), medicineController.getCartMedicines);
export const medicineRoutes = router;
