import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import bcrypt from 'bcrypt';

const createUser = async (userData: IUser): Promise<IUser | null> => {
  const result = await User.create(userData);

  return result;
};

const loginUser = async (userData: IUser): Promise<IUser | null> => {
  const { email, password } = userData;

  const isUserExist = await User.findOne({ email }, { _id: 1, password: 1 });
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

  return isUserExist;
};

export const AuthService = {
  createUser,
  loginUser,
};
