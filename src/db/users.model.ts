import { db } from '.';
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

export const userSelectFields = {
  dateofbirth: users.dateOfBirth,
  fullname: users.fullname,
  avatar: users.avatar,
  gender: users.gender,
  id: users.id,
};

export const detailedUserSelectFields = {
  ...userSelectFields,
  height: users.height,
  weight: users.weight,
  email: users.email,
};
