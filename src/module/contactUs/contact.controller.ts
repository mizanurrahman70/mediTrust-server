import catchAsYnc from "../../utilits/catchAsync";
import sendResponse from "../../utilits/sendResponse";
import { contactServices } from "./contact.service";

const createContactMessage = catchAsYnc(async (req, res) => {
  const review = req.body;
  const result = await contactServices.createContactUsIntoDb(review);
  return sendResponse(res, {
    statusCode: 200,
    message: "Contact message created successfully",
    success: true,
    data: result,
  });
});
const getAllContactMessage = catchAsYnc(async (req, res) => {
  const result = await contactServices.getAllContactUsFromDb(req.query);
  return sendResponse(res, {
    statusCode: 200,
    message: "Contact message retrieved successfully",
    success: true,
    meta: result.meta,
    data: result.result,
  });
});
export const contactControllers = {
  createContactMessage,
   getAllContactMessage,
};
