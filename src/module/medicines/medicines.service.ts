import QueryBuilder from "../../builder/QueryBuilder";
import { IMedicine } from "./medicines.interface";
import Medicine from "./medicines.model";

// Create a Medicine
const createMedicine = async (payload: IMedicine) => {
  const result = await Medicine.create(payload);
  return result;
};

// Get all Medicines
const getAllMedicines = async (query: Record<string, unknown>) => {
  const medicineQuery = new QueryBuilder(Medicine.find(), query)
    .search(["name", "symptoms"])
    .fields()
    .filter()
    .paginate()
    .priceRange()
    .sort();
  const result = await medicineQuery.queryModel;
  const meta = await medicineQuery.countTotal();
  return { result, meta };
};

// Get a Medicine by ID
const getMedicineById = async (medicineId: string) => {
  const res = await Medicine.findById(medicineId);

  return res;
};

// Update a Medicine
const updateMedicine = async (medicineId: string, updates: Partial<IMedicine>) => {
  const updatedMedicine = await Medicine.findByIdAndUpdate(medicineId, updates, { new: true });
  return updatedMedicine;
};

// Delete a Medicine
const deleteMedicine = async (medicineId: string) => {
  const deletedMedicine = await Medicine.findByIdAndDelete(medicineId);
  return deletedMedicine;
};

export const MedicineService = {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};
