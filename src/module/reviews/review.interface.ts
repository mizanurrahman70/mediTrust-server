import { Types } from "mongoose";

export type TReview = {
    reviewer: Types.ObjectId;
    product: Types.ObjectId;
    rating: number;
    comment: string;
}