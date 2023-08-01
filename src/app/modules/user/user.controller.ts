import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const getUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  //   console.log(user);

  const result = await UserService.getUser(user?.email);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'UserDetails fetched successfully',
    data: result,
  });
});

export const UserController = {
  getUser,
};
