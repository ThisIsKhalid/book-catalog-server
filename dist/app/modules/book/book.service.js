"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const user_model_1 = require("../user/user.model");
const book_constant_1 = require("./book.constant");
const book_model_1 = require("./book.model");
const addBook = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.create(bookData);
    return result;
});
const addReveiw = (id, reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield book_model_1.Book.findById({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Book does not exist');
    }
    const updatedBook = yield book_model_1.Book.findOneAndUpdate({ _id: id }, { $push: { reviews: reviewData } }, { new: true });
    return updatedBook;
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById({ _id: id });
    if (!book) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Book does not exist');
    }
    return book;
});
const getAllBooks = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    //  partial match
    if (searchTerm) {
        andConditions.push({
            $or: book_constant_1.bookSearchableFields.map(field => ({
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
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    // console.log(sortBy);
    // console.log(sortConditions);
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield book_model_1.Book.find(whereConditions)
        .populate('user')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield book_model_1.Book.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const updateBook = (id, payload, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findOne({ email: userEmail });
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const isBookExist = yield book_model_1.Book.findOne({ _id: id });
    if (!isBookExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Book does not exist');
    }
    const isUserAuthorized = isUserExist._id.toString() === isBookExist.user.toString();
    // console.log(isUserAuthorized);
    if (!isUserAuthorized) {
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
    }
    const result = yield book_model_1.Book.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteBook = (id, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findOne({ email: userEmail });
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const isBookExist = yield book_model_1.Book.findOne({ _id: id });
    if (!isBookExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Book does not exist');
    }
    const isUserAuthorized = isUserExist._id.toString() === isBookExist.user.toString();
    // console.log(isUserAuthorized);
    if (!isUserAuthorized) {
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
    }
    const result = yield book_model_1.Book.findOneAndDelete({ _id: id });
    return result;
});
exports.BookService = {
    addBook,
    addReveiw,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
};
