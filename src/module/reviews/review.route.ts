import express from 'express';
import { reviewControllers } from './review.controller';
import validateRequest from '../middlewares/validateRequest';
import { reviewValidationSchema } from './review.validation';
import auth from '../middlewares/auth';
const router = express.Router();
router.post(
  '/create-review',
  auth('customer'),
  validateRequest(reviewValidationSchema),
  reviewControllers.createReview,
);
router.get('/reviews', reviewControllers.getAllReviews);
router.get('/review/:productId', reviewControllers.getProductReviews);
router.delete(
  '/review/:id',
  auth('admin', 'supperAdmin'),
  reviewControllers.deleteReview,
);
router.get('/my-reviews',auth("customer"), reviewControllers.getMyReviews);
export const reviewRoutes = router;
