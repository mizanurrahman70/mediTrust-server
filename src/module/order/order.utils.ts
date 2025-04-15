import Shurjopay, { PaymentResponse, VerificationResponse } from "shurjopay";
import config from "../../config/index";

const shurjopay = new Shurjopay();

shurjopay.config(
  config.sp.sp_endpoint!,
  config.sp.sp_username!,
  config.sp.sp_password!,
  config.sp.sp_prefix!,
  config.sp.sp_return_url!
);

// Make Payment Async Function
const makePaymentAsync = async (paymentPayload: any): Promise<PaymentResponse> => {
  return new Promise((resolve, reject) => {
    shurjopay.makePayment(
      paymentPayload,
      (response: PaymentResponse) => resolve(response),
      (error: any) => reject(error)
    );
  });
};

// Verify Payment Async Function
const verifyPaymentAsync = async (order_id: string): Promise<VerificationResponse[]> => {
  return new Promise((resolve, reject) => {
    shurjopay.verifyPayment(
      order_id,
      (response: VerificationResponse[]) => resolve(response),
      (error: any) => reject(error)
    );
  });
};

// Export Utilities
export const orderUtils = {
  makePaymentAsync,
  verifyPaymentAsync
};


