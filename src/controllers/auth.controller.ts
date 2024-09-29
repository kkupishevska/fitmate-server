import express from 'express';
import crypto from 'crypto';

import {
  createUser,
  getFullUserById,
  getUserByEmail,
  updateUserById,
} from '../services/users.service';
import { authentication, random } from '../helpers/auth';
import { returnExpireDate } from '../helpers/date';
import { sendEmail } from '../helpers/sendEmail';
import {
  createUserToken,
  deleteUserToken,
  getTokenByUserId,
} from '../services/tokens.service';

export const signup = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, ...rest } = req.body;

    if (!email || !password) return res.sendStatus(400);

    const result = await getUserByEmail(email);
    if (result && result.length) return res.sendStatus(400);

    const salt = random();
    const hashedPassword = authentication(salt, password);

    const user = await createUser({
      password: hashedPassword,
      email,
      salt,
      ...rest,
    });

    return res.status(201).json(user).end();
  } catch (e) {
    console.error(e);
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

    const sessionToken = authentication(random(), user.password);
    user.sessionToken = sessionToken;

    const updatedUser = await updateUserById(user.id, user);

    res.cookie(process.env.SESSION_TOKEN_KEY, sessionToken, {
      expires: returnExpireDate(),
      domain: process.env.DOMAIN,
      path: '/',
    });

    return res.status(200).json(updatedUser).end();
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
};

export const sendResetToken = async (req: express.Request, res: express.Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required.' });

    const user = await getUserByEmail(email);
    if (!user || !user.length) return res.sendStatus(400);

    const tokensList = await getTokenByUserId(user[0].id);
    if (tokensList && tokensList.length) await deleteUserToken(tokensList[0].token);

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = authentication(user[0].salt, resetToken);

    await createUserToken({
      createdAt: new Date(),
      userId: user[0].id,
      token: hashedToken,
    });

    const link = `http://${process.env.CLIENT_URL}/passwordReset?token=${resetToken}&id=${user[0].id}`;
    console.log(link);

    const html = `<b>Hi ${user[0].fullname}, </b>
      <p> You requested to reset your password. </p>
      <p> Please, click the link below to reset your password. </p>
      <a href="${link}">Reset Password</a>`;

    await sendEmail({
      subject: 'Password Reset Request',
      to: user[0].email,
      message: html,
    });

    return res.status(200).json({ message: 'Check your mail!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const resetPassword = async (req: express.Request, res: express.Response) => {
  try {
    const { userId, token, password } = req.body;

    const passwordResetToken = await getTokenByUserId(userId);
    const user = await getFullUserById(userId);

    if (!user || !user.length) {
      return res.status(402).json({ message: "User doesn't exist." });
    }

    if (!passwordResetToken || !passwordResetToken.length) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    const expectedHash = authentication(user[0].salt, token);
    if (passwordResetToken[0].token !== expectedHash) {
      return res.status(401).json({ message: "Token expired or doesn't exist." });
    }

    const newSalt = random();
    const newHashedPassword = authentication(newSalt, password);

    await updateUserById(userId, {
      ...user[0],
      password: newHashedPassword,
      salt: newSalt,
    });

    await deleteUserToken(passwordResetToken[0].token);

    return res.status(200).json({ message: 'Password successfully updated' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
