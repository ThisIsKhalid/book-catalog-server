import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationConstant';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookFilterableFields } from './book.constant';
import { IBookDetails } from './book.interface';
import { BookService } from './book.service';

const addBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    // console.log(req.cookies, 'cookies');

    const bookData = req.body;
    const result = await BookService.addBook(bookData);

    sendResponse<IBookDetails>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book added successfully!',
      data: result,
    });
  },
);

const addReveiw: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    // console.log(req.cookies, 'cookies');

    const id = req.params.id;
    const reviewData = req.body;
    const result = await BookService.addReveiw(id, reviewData);

    sendResponse<IBookDetails>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Reveiw added successfully!',
      data: result,
    });
  },
);

const getSingleBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BookService.getSingleBook(id);

    sendResponse<IBookDetails>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book retrieved successfully!',
      data: result,
    });
  },
);

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BookService.getAllBooks(filters, paginationOptions);

  sendResponse<IBookDetails[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

export const BookController = {
  addBook,
  addReveiw,
  getAllBooks,
  getSingleBook,
};
