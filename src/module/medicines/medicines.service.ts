import { IMedicine } from "./medicines.interface";
import medicine from "./medicines.model";

// Create a Medicine
const createMedicine = async (payload: IMedicine) => {
    const result = await medicine.create(payload);
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
    const Medicines = await medicine.find(query);
    return Medicines;
};

// Get a Medicine by ID
const getMedicineById = async (medicineId: string) => {
    const Medicine = await medicine.findById(medicineId);

    return Medicine;
};

// Update a Medicine
const updateMedicine = async (medicineId: string, updates: Partial<IMedicine>) => {
    const updatedMedicine = await medicine.findByIdAndUpdate(medicineId, updates, { new: true });
    return updatedMedicine;
};

// Delete a Medicine
const deleteMedicine = async (medicineId: string) => {
    const deletedMedicine = await medicine.findByIdAndDelete(medicineId);
    return deletedMedicine;
};

export const MedicineService = {
    createMedicine,
    getAllMedicines,
    getMedicineById,
    updateMedicine,
    deleteMedicine,
};