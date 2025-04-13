import { Schema, model } from "mongoose";

const medicineSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: { type: Number, required: true },
  stockAvailability: {
    type: Boolean,
    required: true,
  },
  requiredPrescription: {
    type: Boolean,
    required: true,
  },
  manufacturerDetails: {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
  },
  symptoms: {
    type: String,
    required: true,
  },
  image: { type: String, required: true },
  expiryDate: {
    type: Date,
    required: true,
  },
});

const Medicine = model("Medicine", medicineSchema);

export default Medicine;
