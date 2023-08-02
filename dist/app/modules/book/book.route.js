"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const book_controller_1 = require("./book.controller");
const book_validation_1 = require("./book.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/add-book', (0, validateRequest_1.default)(book_validation_1.BookValidation.addBookZodSchema), book_controller_1.BookController.addBook);
router.post('/:id/add-review', (0, validateRequest_1.default)(book_validation_1.BookValidation.addReviewZodSchema), book_controller_1.BookController.addReveiw);
router.patch('/edit-book/:id', (0, auth_1.default)(), book_controller_1.BookController.updateBook);
router.delete('/delete-book/:id', (0, auth_1.default)(), book_controller_1.BookController.deleteBook);
router.get('/:id', book_controller_1.BookController.getSingleBook);
router.get('/', book_controller_1.BookController.getAllBooks);
exports.BookRoutes = router;
