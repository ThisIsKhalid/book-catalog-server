import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';
import auth from '../../middlewares/auth';

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

router.patch('/edit-book/:id', auth(), BookController.updateBook);

router.delete('/delete-book/:id', auth(), BookController.deleteBook);

router.get('/:id', BookController.getSingleBook);

router.get('/', BookController.getAllBooks);

export const BookRoutes = router;
