import mongoose, { Types } from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { Product } from '../products/products.model';
import { User } from '../user/user.model';
import { TReview } from './review.interface';
import { Review } from './review.model';

const createReviewIntoDb = async (data: TReview) => {
  const productData = await Product.findById(data.product);
  // throw error if product is not found
  if (!productData) {
    throw new AppError(404, 'Product not found');
  }

  const user = await User.findById(data.reviewer);
  // throw error if product is not found
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  const isExistReviewOnSameProductBySameUser = await Review.find({
    reviewer: data.reviewer,
    product: data.product,
  });
  if (isExistReviewOnSameProductBySameUser.length > 0) {
    throw new AppError(400, 'You already give review on this product');
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // reduce the product quantity
    const [review] = await Review.create([data], { session });

    // Push the new review ID to the product's review array
    await Product.findByIdAndUpdate(
      data.product,
      { $push: { reviews: review._id } }, // Push the review ID
      { new: true, session },
    );
    await session.commitTransaction();
    await session.endSession();

    return review;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500, err.message);
  }
};
const getAllReviewsFromDb = async (query: Record<string, unknown>) => {
  const reviewQuery = new QueryBuilder(
    Review.find().populate('reviewer product'),
    query,
  )
    .fields()
    .filter()
    .paginate();
  const result = await reviewQuery.queryModel;
  const meta = await reviewQuery.countTotal();
  return { result, meta };
};
const getReviewsForProductFromDb = async (productId: string) => {
  const result = await Review.find({ product: productId }).populate(
    'reviewer product',
  );
  return result;
};
// For bad review
const deleteReviewFromDb = async (id: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the review first
    const review = await Review.findById(id).session(session);
    if (!review) {
      throw new AppError(404, 'Review not found');
    }

    // Remove the review reference from the associated product
    await Product.findByIdAndUpdate(
      review.product,
      { $pull: { reviews: new Types.ObjectId(id) } },
      { session },
    );

    // Delete the review
    const result = await Review.findByIdAndDelete(id).session(session);

    await session.commitTransaction();
    session.endSession();

    return result;
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(500, err.message);
  }
};
const getMyReviewsFromDb = async (email: string) => {
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new AppError(404, 'User not found');
  }
  const result = await Review.find({ reviewer: isUserExist?._id }).populate(
    'reviewer product',
  );
  return result;
};
export const reviewServices = {
  createReviewIntoDb,
  getAllReviewsFromDb,
  getReviewsForProductFromDb,
  deleteReviewFromDb,
  getMyReviewsFromDb,
};
