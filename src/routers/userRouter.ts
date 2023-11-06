import {
  loginController,
  registerController,
} from '#controllers/user/authController.ts';
import express from 'express';
import { allUsersController, updateUser } from '#controllers/user/users.ts';
import { deleteUser } from '../controllers/user/users';
import { isAuthenticated, isOwner } from '#middlewares/index.ts';

export const registerRoute = express
  .Router()
  .post('/auth/register', registerController);

export const loginRoute = express.Router().post('/auth/login', loginController);

export const getAllUsersRouter = express
  .Router()
  .get('/all', allUsersController)
  .delete('/:id', isAuthenticated, isOwner, deleteUser)
  .patch('/:id', isAuthenticated, isOwner, updateUser);
