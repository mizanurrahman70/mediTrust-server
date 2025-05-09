import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["medicine", "instrument"],
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

  requiredPrescription: {
    type: Boolean,
  },
  symptoms: {
    type: String,
  },
  expiryDate: {
    type: Date,
  },

  warrantyPeriod: { type: String },
  brand: { type: String },
  features: [{ type: String }],

  usageInstructions: { type: String },
  manufacturerDetails: {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },

  image: { type: String, required: true },
});

const Product = model("Product", productSchema);

export default Product;
