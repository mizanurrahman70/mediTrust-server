import validateRequest from "../../middlewares/validateRequest";
import { medicineController } from "./medicines.controller";
import express from "express";
import { createMedicineValidationSchema } from "./medicines.validaton";
const router = express.Router();
// Define routes
router.post(
  "/medicine",
  validateRequest(createMedicineValidationSchema),
  medicineController.createMedicine
);
router.get("/medicines", medicineController.getAllMedicines);
router.get("/medicine/:medicineId", medicineController.getMedicineById);
router.put("/medicine/:medicineId", medicineController.updateMedicine);
router.delete("/medicine/:medicineId", medicineController.deleteMedicine);

export const medicineRoutes = router;
