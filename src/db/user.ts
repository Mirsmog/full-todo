import mongoose from 'mongoose';

interface IAuth {
  password: string;
  salt: string;
  token?: string;
}

interface IUser {
  username: string;
  email: string;
  authentication: IAuth;
}

const UserScheme = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    token: { type: String, select: false },
  },
});

export const UserModel = mongoose.model('User', UserScheme);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserByToken = (token: string) =>
  UserModel.findOne({ 'authentication.token': token });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (value: Record<string, any>) =>
  new UserModel(value).save().then((user) => user.toObject());
export const deleteUserById = (id: string) =>
  UserModel.findByIdAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
