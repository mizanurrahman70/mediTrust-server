export interface THealthInstrument {
  name: string;
  description: string;
  price: number;
  quantity: number;
  brand: string;
  warrantyPeriod?: string; // Optional, e.g., '1 year'
  features?: string[]; // e.g., ['Digital Display', 'Rechargeable']
  usageInstructions?: string;
  manufacturerDetails: {
    name: string;
    contact: string;
    location: string;
  };
  image: string;
}
