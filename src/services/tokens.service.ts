import { eq } from 'drizzle-orm';
import { NewToken, tokens } from '../db/tokens.model';
import { db } from '../db';

export const getTokenByUserId = async (userId: number) =>
  await db.select().from(tokens).where(eq(tokens.userId, userId));

export const createUserToken = async (token: NewToken) =>
  await db.insert(tokens).values(token).returning();

export const deleteUserToken = async (token: string) =>
  await db.delete(tokens).where(eq(tokens.token, token));
