import { getUsers, getUserById } from '../db/users';
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

    return res.status(200).json(user)
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

// export const getUserById
