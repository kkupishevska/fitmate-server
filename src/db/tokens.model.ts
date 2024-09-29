import { timestamp, pgTable, integer, text } from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';

import { users } from './users.model';

export const tokens = pgTable('tokens', {
  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  token: text('token').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Token = InferModel<typeof tokens>;
export type NewToken = InferModel<typeof tokens, 'insert'>;
