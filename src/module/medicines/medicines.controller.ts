import { NextFunction, Request, Response } from "express";
import { MedicineService } from "./medicines.service";
import catchAsYnc from "../../utilits/catchAsync";

// Create a Medicine
const createMedicine = catchAsYnc(async (req, res) => {
  const Medicine = req.body;
  const result = await MedicineService.createMedicine(Medicine);
  res.status(201).json({
    message: "Medicine created successfully",
    success: true,
    data: result,
  });
});

// Get all Medicines
const getAllMedicines = catchAsYnc(async (req, res) => {
  const query = req.query;

  const Medicines = await MedicineService.getAllMedicines(query);
  res.status(200).json({
    message: "Medicines retrieved successfully",
    success: true,
    data: Medicines,
  });
});

// Get a Medicine by ID
const getMedicineById = catchAsYnc(async (req, res) => {
  const { medicineId } = req.params;
  const Medicine = await MedicineService.getMedicineById(medicineId);
  if (!Medicine) {
    res.status(404).json({ message: "Medicine not found", success: false });
  }

  res
    .status(200)
    .json({ message: "Medicine retrieved successfully", success: true, data: Medicine });
});

// Update a Medicine
const updateMedicine = catchAsYnc(async (req, res) => {
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
});

// Delete a Medicine
const deleteMedicine = catchAsYnc(async (req, res) => {
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
});

// Get Cart Medicine
const getCartMedicines = catchAsYnc(async (req, res) => {
  const medicineIds = req.body;
  const result = await MedicineService.getCartMedicines(medicineIds);

  res.status(201).json({
    message: " Cart Medicine getting  successfully",
    success: true,
    data: result,
  });
});

// Export the Medicine controller
export const medicineController = {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
  getCartMedicines,
};
