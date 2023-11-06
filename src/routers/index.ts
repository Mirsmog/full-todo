import { Router } from 'express';
import { getAllUsersRouter, loginRoute, registerRoute } from './userRouter';
import welcomeRouter from './welcomeRouter';
import { isAuthenticated } from '#middlewares/index.ts';

const router = Router();

router.use('/user', registerRoute);
router.use('/user', loginRoute);
router.use('/users', isAuthenticated, getAllUsersRouter);

router.use('/', welcomeRouter);

export default router;
