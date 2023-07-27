import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IBookDetails } from './book.interface';
import httpStatus from 'http-status';
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

export const BookController = {
  addBook,
  addReveiw,
};
