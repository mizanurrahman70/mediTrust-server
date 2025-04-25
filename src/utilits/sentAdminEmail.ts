import nodemailer from "nodemailer";
import config from "../config";
type IData = {
  productName: string;
  quantity: number;
};
export const sendLowStockMail = async (data: IData) => {
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
    to: "jmjubaer3927@gmail.com", // list of receivers
    subject: `Change the order status in MediMart`, // Subject line
    text: `Change the order status in MediMart`, // plain text body
    html: `
       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 20px;">
  <h2 style="color: #D9534F;">⚠️ Low Stock Alert</h2>
  
  <p>Hello Admin,</p>

  <p>The following product(s) are running low on stock. Please restock as soon as possible to avoid delays in order fulfillment.</p>

  <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
    <thead>
      <tr style="background-color: #f5f5f5;">
        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Product Name</th>
        <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Current Stock</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">${data?.productName}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${data?.quantity}</td>
      </tr>
    </tbody>
  </table>

  <p style="margin-top: 20px;">Please take the necessary actions to restock the items.</p>

  <p style="margin-top: 24px;">Best regards,  
    <br/><strong>Medi Mart System</strong>
  </p>
</div>

      `, // html body
  });

};
