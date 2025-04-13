export interface IMedicine {
  name: string;
  description: string;
  price: number;
  quantity: number;
  stockAvailability: boolean;
  requiredPrescription: boolean;
  manufacturerDetails: {
    name: string;
    contact: string;
  };
  expiryDate: Date;
  image: string;
}
