import { createUser, getUserByEmail } from '#db/user.ts';
import express from 'express';
import { authorization, random } from '#helpers/index.ts';

export const loginController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.json('invalid data').status(400);

    const user = await getUserByEmail(email).select(
      '+authentication.salt +authentication.password'
    );

    if (!user) {
      return res.json("The user doesn't exist").status(400);
    }

    const expectedHash = authorization(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      return res.json('Invalid email or password').status(403);
    }

    const salt = random();
    user.authentication.token = authorization(salt, user._id.toString());

    await user.save();

    res.cookie('EDALsoMa', user.authentication.token, {
      domain: 'localhost',
      path: '/',
    });
    return res.json(user).status(200).end();
  } catch (error) {
    return res.json(`error during login ${error}`).status(400);
  }
};

export const registerController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.json('incorrect data').status(400);
    }
    const userExist = await getUserByEmail(email);

    if (userExist) {
      return res.json('This email already exist').status(400);
    }
    const salt = random();
    console.log(password);
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authorization(salt, password),
      },
    });
    return res.json(user).status(200).end();
  } catch (error) {
    return res.json(`error during register ${error}`).status(400);
  }
};
