import express from 'express';

import { createUser, getUserByEmail, updateUserById } from '../db/users';
import { DOMAIN, SESSION_TOKEN } from './../constants/index';
import { authentication, random } from '../helpers/auth';
import { returnExpireDate } from '../helpers/date';

export const signup = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, ...rest } = req.body;

    if (!email || !password) return res.sendStatus(400);
    const result = await getUserByEmail(email);

    if (!result || result.length) return res.sendStatus(400);
    const salt = random();
    const user = await createUser({
      password: authentication(salt, password),
      email,
      salt,
      ...rest,
    });

    return res.status(201).json(user).end();
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

export const signin = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.sendStatus(400);
    const result = await getUserByEmail(email);

    if (!result || !result.length) return res.sendStatus(400);
    const user = result[0];
    const expectedHash = authentication(user.salt, password);

    if (user.password !== expectedHash) return res.sendStatus(403);
    user.sessionToken = authentication(random(), user.password);
    const updatedUser = await updateUserById(user.id, user);

    res.cookie(SESSION_TOKEN, user.sessionToken, {
      expires: returnExpireDate(),
      domain: DOMAIN,
      path: '/',
    });
    console.log()
    return res.status(200).json({ user: updatedUser }).end();
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};
