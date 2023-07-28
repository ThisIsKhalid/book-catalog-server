import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';

const router = express.Router();

router.post(
  '/add-book',
  validateRequest(BookValidation.addBookZodSchema),
  BookController.addBook,
);

router.post(
  '/:id/add-review',
  validateRequest(BookValidation.addReviewZodSchema),
  BookController.addReveiw,
);

export const BookRoutes = router;
