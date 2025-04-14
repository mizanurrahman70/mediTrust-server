import { NextFunction, Request, Response } from "express";
import { MedicineService } from "./medicines.service";

// Create a Medicine
const createMedicine = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const Medicine = req.body;
    const result = await MedicineService.createMedicine(Medicine);
    res.status(201).json({
      message: "Medicine created successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Get all Medicines
const getAllMedicines = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.query;

    const Medicines = await MedicineService.getAllMedicines(query);
    res.status(200).json({
      message: "Medicines retrieved successfully",
      success: true,
      data: Medicines,
    });
  } catch (error) {
    next(error);
  }
};

// Get a Medicine by ID
const getMedicineById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { medicineId } = req.params;
    const Medicine = await MedicineService.getMedicineById(medicineId);
    if (!Medicine) {
      res.status(404).json({ message: "Medicine not found", success: false });
    }

    res
      .status(200)
      .json({ message: "Medicine retrieved successfully", success: true, data: Medicine });
  } catch (error) {
    next(error);
  }
};

// Update a Medicine
const updateMedicine = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const MedicineId = req.params.medicineId;
    const updates = req.body;
    const updatedMedicine = await MedicineService.updateMedicine(MedicineId, updates);
    if (updatedMedicine) {
      res.status(200).json({
        message: "Medicine updated successfully",
        success: true,
        data: updatedMedicine,
      });
    } else {
      res.status(404).json({
        message: "Medicine not found",
        success: false,
      });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a Medicine
const deleteMedicine = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const MedicineId = req.params.medicineId;
    const deletedMedicine = await MedicineService.deleteMedicine(MedicineId);
    if (deletedMedicine) {
      res.status(200).json({
        message: "Medicine deleted successfully",
        success: true,
        data: deletedMedicine,
      });
    } else {
      res.status(404).json({
        message: "Medicine not found",
        success: false,
        data: null,
      });
    }
  } catch (error) {
    next(error);
  }
};

// Export the Medicine controller
export const medicineController = {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};
