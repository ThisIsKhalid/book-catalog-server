import { IUser } from './user.interface';
import { User } from './user.model';

const getUser = async (email: string): Promise<IUser | null> => {
  const result = await User.findOne({ email: email });
  return result;
};

export const UserService = {
  getUser,
};
