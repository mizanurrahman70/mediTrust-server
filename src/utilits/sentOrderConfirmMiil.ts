import nodemailer from "nodemailer";
import config from "../config";
type IData = {
  userName: string;
  productNames: string[];
  quantity: number;
  totalPrice: number;
  deliveryOptions: string;
  paymentStatus: string;
  orderStatus: string;
};
export const sendConfirmOrderMail = async (to: string, data: IData) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: config.nodemailer_user_email,
      pass: config.nodemailer_user_pass,
    },
  });

  await transporter.sendMail({
    from: "medimart@gmail.com", // sender address
    to, // list of receivers
    subject: `Order confirmation in MediMart`, // Subject line
    text: `Order confirmation in MediMart`, // plain text body
    html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">Hi ${data?.userName},</h2>
          <div style="margin: 10px 0">
              <h2>Product List</h2>
               <ol>
                    
                    ${data?.productNames?.map((product: string) => `<li><h3>${product}</h3></li> `).join("")}
                </ol>
          </div>
          <p>Thank you for your order at <strong>Medi Mart</strong>! We're excited to process your purchase.</p>
          <h4>Order Summary</h4>
          <p><strong>Order Quantity:</strong> ${data?.quantity}</p>
          <p><strong>Total Price:</strong> $${data?.totalPrice}</p>
          <p><strong>Delivery Option:</strong> ${data?.deliveryOptions}</p>
          <p><strong>Payment Status:</strong> ${data?.paymentStatus}</p>
          <p><strong>Order Status:</strong> ${data?.orderStatus}</p>
          <p>We'll notify you when your items are delivery.</p>
          <br />
          <p>Best regards,<br/>Medi Mart Team</p>
        </div>
      `, // html body
  });
};
