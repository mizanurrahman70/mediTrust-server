import { medicineController } from "./medicines.controller";
import express from "express";
const router = express.Router();
// Define routes
router.post('/medicines', medicineController.createMedicine);
router.get("/medicines", medicineController.getAllMedicines);
router.get("/medicine/:medicineId", medicineController.getMedicineById);
router.put("/medicine/:medicineId", medicineController.updateMedicine);
router.delete("/medicine/:medicineId", medicineController.deleteMedicine);

export const medicineRoutes = router;