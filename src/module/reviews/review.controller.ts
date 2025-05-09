import catchAsYnc from "../../utilits/catchAsync";
import sendResponse from "../../utilits/sendResponse";
import { reviewServices } from "./review.service";

const createReview = catchAsYnc(async (req, res) => {
  const review = req.body;
  const result = await reviewServices.createReviewIntoDb(review);
  return sendResponse(res, {
    statusCode: 200,
    message: "Review created successfully",
    success: true,
    data: result,
  });
});
const getAllReviews = catchAsYnc(async (req, res) => {
  const result = await reviewServices.getAllReviewsFromDb(req.query);
  return sendResponse(res, {
    statusCode: 200,
    message: "Review retrieved successfully",
    success: true,
    meta: result.meta,
    data: result.result,
  });
});
const isUserGiveReviewThisProduct = catchAsYnc(async (req, res) => {
  const { userId, productId } = req.body;
  const result = await reviewServices.isUserGiveReviewThisProduct(productId, userId);
  return sendResponse(res, {
    statusCode: 200,
    message: "Review retrieved successfully",
    success: true,
    data: result,
  });
});
const getProductReviews = catchAsYnc(async (req, res) => {
  const { productId } = req.params;
  const result = await reviewServices.getReviewsForProductFromDb(productId);
  return sendResponse(res, {
    statusCode: 200,
    message: "Review retrieved successfully",
    success: true,
    data: result,
  });
});
const deleteReview = catchAsYnc(async (req, res) => {
  const { id } = req.params;
  const result = await reviewServices.deleteReviewFromDb(id);
  return sendResponse(res, {
    statusCode: 200,
    message: "Review delete successfully",
    success: true,
    data: result,
  });
});
const getMyReviews = catchAsYnc(async (req, res) => {
  const { email } = req.user || {};
  const result = await reviewServices.getMyReviewsFromDb(email);
  return sendResponse(res, {
    statusCode: 200,
    message: "Review retrieved successfully",
    success: true,
    data: result,
  });
});
export const reviewControllers = {
  createReview,
  getAllReviews,
  getProductReviews,
  deleteReview,
  getMyReviews,
  isUserGiveReviewThisProduct
};
