import { model, Schema } from "mongoose";
import { THealthInstrument } from "./instrument.interface";

const HealthInstrumentSchema = new Schema<THealthInstrument>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    
    warrantyPeriod: { type: String },
    brand: { type: String, required: true },
    features: [{ type: String }],
    usageInstructions: { type: String },

    manufacturerDetails: {
      name: { type: String, required: true },
      contact: { type: String, required: true },
      location: { type: String, required: true },
    },
    image: { type: String, required: true },
  }, {
    timestamps: true,
  });
  
  export const HealthInstrument = model<THealthInstrument>('HealthInstrument', HealthInstrumentSchema);
  