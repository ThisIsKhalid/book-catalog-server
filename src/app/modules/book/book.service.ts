import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import { IBookDetails, IReview } from './book.interface';
import { Book } from './book.model';

const addBook = async (
  bookData: IBookDetails,
): Promise<IBookDetails | null> => {
  const result = await Book.create(bookData);

  return result;
};

const addReveiw = async (
  id: string,
  reviewData: IReview,
): Promise<IBookDetails | null> => {
  const isExist = await Book.findById({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book does not exist');
  }

  const updatedBook = await Book.findOneAndUpdate(
    { _id: id },
    { $push: { reviews: reviewData } },
    { new: true },
  );

  return updatedBook;
};

export const BookService = {
  addBook,
  addReveiw,
};
