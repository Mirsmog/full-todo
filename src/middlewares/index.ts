import { getUserByEmail, getUserByToken } from '#db/user.ts';
import express from 'express';
import { get, merge } from 'lodash';
export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies['EDALsoMa'];
    const validToken = await getUserByToken(sessionToken);
    if (!sessionToken || !validToken) {
      return res.json('access denied').status(403);
    }
    merge(req, { identity: validToken });
    next();
    return res.status(200);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as unknown as string;

    if (!currentUserId) {
      return res.sendStatus(400);
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
