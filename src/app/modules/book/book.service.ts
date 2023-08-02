import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/apiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { User } from '../user/user.model';
import { bookSearchableFields } from './book.constant';
import { IBookDetails, IBookFilters, IReview } from './book.interface';
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

const getSingleBook = async (id: string): Promise<IBookDetails | null> => {
  const book = await Book.findById({ _id: id });
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book does not exist');
  }

  return book;
};

const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IBookDetails[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  //  partial match
  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  // console.log(sortBy);
  // console.log(sortConditions);
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereConditions)
    .populate('user')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Book.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateBook = async (
  id: string,
  payload: Partial<IBookDetails>,
  userEmail: string,
): Promise<IBookDetails | null> => {
  const isUserExist = await User.findOne({ email: userEmail });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const isBookExist = await Book.findOne({ _id: id });
  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book does not exist');
  }

  const isUserAuthorized =
    isUserExist._id.toString() === isBookExist.user.toString();
  // console.log(isUserAuthorized);

  if (!isUserAuthorized) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteBook = async (
  id: string,
  userEmail: string,
): Promise<IBookDetails | null> => {
  const isUserExist = await User.findOne({ email: userEmail });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const isBookExist = await Book.findOne({ _id: id });
  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book does not exist');
  }

  const isUserAuthorized =
    isUserExist._id.toString() === isBookExist.user.toString();
  // console.log(isUserAuthorized);

  if (!isUserAuthorized) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  const result = await Book.findOneAndDelete({ _id: id });

  return result;
};

export const BookService = {
  addBook,
  addReveiw,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
