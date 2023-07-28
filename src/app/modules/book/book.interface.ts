import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IReview = {
  rating: number;
  comment: string;
  reviewerEmail: string;
  //   reviewDate: Date;
};

export type IBookDetails = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews?: IReview[];
  user: Types.ObjectId | IUser;
};

export type BookModel = Model<IBookDetails, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publicationDate?: string;
};
