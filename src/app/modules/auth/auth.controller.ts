import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from '../user/user.interface';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    // console.log(req.cookies, 'cookies');

    const userData = req.body;
    const result = await AuthService.createUser(userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  },
);

const loginUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    // console.log(req.cookies, 'cookies');

    const userData = req.body;
    const result = await AuthService.loginUser(userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged in successfully!',
      data: result,
    });
  },
);

export const AuthController = {
  createUser,
  loginUser,
};
