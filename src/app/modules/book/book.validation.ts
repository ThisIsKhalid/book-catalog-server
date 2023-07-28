import { z } from 'zod';

const addBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required.',
    }),
    author: z.string({
      required_error: 'Author is required.',
    }),
    genre: z.string({
      required_error: 'Genre is required.',
    }),
    publicationDate: z.string({
      required_error: 'Publication Date is required.',
    }),
    reviews: z.string().optional(),
    user: z.string({
      required_error: 'User id is required.',
    }),
  }),
});

const addReviewZodSchema = z.object({
  body: z.object({
    rating: z.number({
      required_error: 'Rating is required.',
    }),
    comment: z.string({
      required_error: 'Comment is required.',
    }),
    reviewerEmail: z.string({
      required_error: 'Email is required.',
    }),
  }),
});

export const BookValidation = {
  addBookZodSchema,
  addReviewZodSchema,
};
