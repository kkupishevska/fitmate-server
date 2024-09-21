import {
  getUsers,
  getUserById,
  updateUserById,
  getUserBySessionToken,
} from '../services/users.service';
import express from 'express';

export const getUsersList = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

export const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const result = await getUserById(parseInt(id));

    if (!result || !result.length) return res.sendStatus(400);
    const user = result[0];

    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};


export const getMyInfo = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const sessionToken = req.cookies[process.env.SESSION_TOKEN_KEY];
    if (!sessionToken) return res.sendStatus(403);

    const user = await getUserBySessionToken(sessionToken);

    if (!user || !user.length) return res.sendStatus(403);
    const updatedUser = await updateUserById(user[0].id, {
      ...user[0],
      ...req.body,
    });

    return res.status(200).json(updatedUser).end();
  } catch (e) {}
};

export const updateMyInfo = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const sessionToken = req.cookies[process.env.SESSION_TOKEN_KEY];
    if (!sessionToken) return res.sendStatus(403);

    const user = await getUserBySessionToken(sessionToken);

    if (!user || !user.length) return res.sendStatus(403);
    const updatedUser = await updateUserById(user[0].id, {
      ...user[0],
      ...req.body,
    });

    return res.status(200).json(updatedUser).end();
  } catch (e) {}
};
