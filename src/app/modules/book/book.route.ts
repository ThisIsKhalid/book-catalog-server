import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();

router.post('/add-book', BookController.addBook);

router.post('/:id/add-review', BookController.addReveiw);

export const BookRoutes = router;
