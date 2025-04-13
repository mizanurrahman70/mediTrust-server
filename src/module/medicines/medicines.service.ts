import { IMedicine } from "./medicines.interface";
import Medicine from "./medicines.model";

// Create a Medicine
const createMedicine = async (payload: IMedicine) => {
    const result = await Medicine.create(payload);
    console.log(result);
    return result;
};

// Get all Medicines
const getAllMedicines = async (searchTerm?: string) => {
    let query = {};
    if (searchTerm) {
        query = {
            $or: [
                { name: new RegExp(searchTerm, 'i') },
                { category: new RegExp(searchTerm, 'i') },
                { symptoms: new RegExp(searchTerm, 'i') },
            ],
        };
    }
    const Medicines = await Medicine.find(query);
    return Medicines;
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