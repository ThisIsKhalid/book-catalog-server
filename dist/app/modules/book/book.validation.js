"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const addBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required.',
        }),
        author: zod_1.z.string({
            required_error: 'Author is required.',
        }),
        genre: zod_1.z.string({
            required_error: 'Genre is required.',
        }),
        publicationDate: zod_1.z.string({
            required_error: 'Publication Date is required.',
        }),
        reviews: zod_1.z.string().optional(),
        user: zod_1.z.string({
            required_error: 'User id is required.',
        }),
    }),
});
const addReviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        rating: zod_1.z.number({
            required_error: 'Rating is required.',
        }),
        comment: zod_1.z.string({
            required_error: 'Comment is required.',
        }),
        reviewerEmail: zod_1.z.string({
            required_error: 'Email is required.',
        }),
        reviewerName: zod_1.z.string({
            required_error: 'Name is required.',
        }),
    }),
});
exports.BookValidation = {
    addBookZodSchema,
    addReviewZodSchema,
};
