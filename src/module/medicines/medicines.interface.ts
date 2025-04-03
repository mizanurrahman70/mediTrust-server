export interface IMedicine {
    name: string;
    description: string;
    price: number;
    stockAvailability: boolean;
    requiredPrescription: boolean; 
    manufacturerDetails: {
      name: string;
      contact: string;
    };
    expiryDate: Date;
  }