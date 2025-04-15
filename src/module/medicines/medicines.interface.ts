export interface TMedicine {
  name: string;
  description: string;
  price: number;
  quantity: number;
  requiredPrescription: boolean;
  manufacturerDetails: {
    name: string;
    contact: string;
    location: string;
  };
  symptoms: string;
  expiryDate: Date;
  image: string;
}
