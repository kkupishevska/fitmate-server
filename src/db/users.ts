import { db } from '../db';
import { eq, InferModel } from 'drizzle-orm';

import {
  timestamp,
  pgTable,
  varchar,
  integer,
  text,
  date,
  real,
  serial,
} from 'drizzle-orm/pg-core';

export const genderMapping = pgTable('gender_mapping', {
  code: integer('code').primaryKey(),
  gender: varchar('gender', { length: 50 }).notNull(),
});

export const users = pgTable('users', {
  gender: integer('gender').references(() => genderMapping.code), // Foreign key reference
  email: varchar('email', { length: 255 }).unique().notNull(),
  fullname: varchar('fullname', { length: 255 }),
  password: text('password_hash').notNull(),
  // id: uuid('id').primaryKey().defaultRandom(),
  sessionToken: text('session_token'),
  dateOfBirth: date('date_of_birth'),
  id: serial('id').primaryKey(),
  avatar: text('avatar'),
  height: real('height'),
  weight: real('weight'),
  salt: text('salt'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, 'insert'>;

export const getUsers = async () =>
  await db
    .select({
      dateofbirth: users.dateOfBirth,
      fullname: users.fullname,
      avatar: users.avatar,
      gender: users.gender,
      email: users.email,
      id: users.id,
    })
    .from(users);

export const getUserByEmail = async (email: string) =>
  await db.select().from(users).where(eq(users.email, email));

export const getUserById = async (id: number) =>
  await db
    .select({
      sessionToken: users.sessionToken,
      dateofbirth: users.dateOfBirth,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      fullname: users.fullname,
      avatar: users.avatar,
      height: users.height,
      weight: users.weight,
      gender: users.gender,
      email: users.email,
      id: users.id,
    })
    .from(users)
    .where(eq(users.id, id));

export const getUserBySessionToken = async (sessionToken: string) =>
  await db.select().from(users).where(eq(users.sessionToken, sessionToken));

export const createUser = async (user: NewUser) =>
  await db.insert(users).values(user).returning({
    dateofbirth: users.dateOfBirth,
    fullname: users.fullname,
    avatar: users.avatar,
    gender: users.gender,
    email: users.email,
    id: users.id,
  });

export const updateUserById = async (id: number, updatedUser: User) =>
  await db.update(users).set(updatedUser).where(eq(users.id, id)).returning({
    dateofbirth: users.dateOfBirth,
    fullname: users.fullname,
    avatar: users.avatar,
    gender: users.gender,
    email: users.email,
    id: users.id,
  });
