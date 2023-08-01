import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/apiError';
import { jwtHelpers } from '../../../helpers/jwtHelper';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';

const createUser = async (userData: IUser): Promise<ILoginUserResponse> => {
  const result = await User.create(userData);

  const { email } = result;
  // console.log(name, email);

  const accessToken = jwtHelpers.createToken(
    { email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { email },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const loginUser = async (userData: ILoginUser): Promise<ILoginUserResponse> => {
  const { email: loggedUser, password } = userData;

  const isUserExist = await User.findOne(
    { email: loggedUser },
    { _id: 1, password: 1, email: 1 },
  );
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (isUserExist.password) {
    const isPasswordMatched = await bcrypt.compare(
      password,
      isUserExist.password,
    );
    if (!isPasswordMatched) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not match');
    }
  }
  const { email } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { email },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  createUser,
  loginUser,
};
