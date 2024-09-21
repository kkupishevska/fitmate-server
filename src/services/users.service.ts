import { eq } from 'drizzle-orm';
import {
  detailedUserSelectFields,
  NewUser,
  User,
  users,
  userSelectFields,
} from '../db/users.model';
import { db } from '../db';

export const getUsers = async () =>
  await db.select(userSelectFields).from(users);

export const getUserByEmail = async (email: string) =>
  await db.select().from(users).where(eq(users.email, email));

export const getUserById = async (id: number) =>
  await db.select(userSelectFields).from(users).where(eq(users.id, id));

export const getFullUserById = async (id: number) =>
  await db.select().from(users).where(eq(users.id, id));

export const getUserBySessionToken = async (sessionToken: string) =>
  await db.select().from(users).where(eq(users.sessionToken, sessionToken));

export const createUser = async (user: NewUser) =>
  await db.insert(users).values(user).returning(userSelectFields);

export const updateUserById = async (id: number, updatedUser: Partial<User>) =>
  await db
    .update(users)
    .set(updatedUser)
    .where(eq(users.id, id))
    .returning({
      ...detailedUserSelectFields,
      sessionToken: users.sessionToken,
    });
