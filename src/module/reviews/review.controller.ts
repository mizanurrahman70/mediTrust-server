import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { reviewServices } from './review.service';

const createReview = catchAsync(async (req, res) => {
  const review = req.body;
  const result = await reviewServices.createReviewIntoDb(review);
  return sendResponse(res, {
    statusCode: 200,
    message: 'Review created successfully',
    success: true,
    data: result,
  });
});
const getAllReviews = catchAsync(async (req, res) => {
  const result = await reviewServices.getAllReviewsFromDb(req.query);
  return sendResponse(res, {
    statusCode: 200,
    message: 'Review retrieved successfully',
    success: true,
    meta: result.meta,
    data: result.result,
  });
});
const getProductReviews = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await reviewServices.getReviewsForProductFromDb(productId);
  return sendResponse(res, {
    statusCode: 200,
    message: 'Review retrieved successfully',
    success: true,
    data: result,
  });
});
const deleteReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await reviewServices.deleteReviewFromDb(id);
  return sendResponse(res, {
    statusCode: 200,
    message: 'Review delete successfully',
    success: true,
    data: result,
  });
});
const getMyReviews = catchAsync(async (req, res) => {
  const { email } = req.user || {};
  const result = await reviewServices.getMyReviewsFromDb(email);
  return sendResponse(res, {
    statusCode: 200,
    message: 'Review retrieved successfully',
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
};
