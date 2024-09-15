import { getUserBySessionToken } from '../db/users';
import { SESSION_TOKEN } from '../constants';
import express from 'express';

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies[SESSION_TOKEN];

    if (!sessionToken) return res.sendStatus(403);

    const result = await getUserBySessionToken(sessionToken);

    if (!result || !result.length) return res.sendStatus(403);

    return next();
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};
