import { Schema, Types, model } from 'mongoose';
import { BookModel, IBookDetails, IReview } from './book.interface';

const ReviewSchema = new Schema<IReview>(
  {
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    reviewerEmail: { type: String, required: true },
    reviewerName: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const BookDetailsSchema = new Schema<IBookDetails, BookModel>(
  {
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publicationDate: { type: String, required: true },
    reviews: [ReviewSchema],
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Book = model<IBookDetails, BookModel>('Book', BookDetailsSchema);
