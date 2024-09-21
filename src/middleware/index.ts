import { getUserBySessionToken } from '../services/users.service';
import express from 'express';

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies[process.env.SESSION_TOKEN_KEY];

    if (!sessionToken) return res.sendStatus(403);

    const result = await getUserBySessionToken(sessionToken);

    if (!result || !result.length) return res.sendStatus(403);

    return next();
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};
