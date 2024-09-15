import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  port: Number(process.env.POSTGRES_PORT) || 5432,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  idleTimeoutMillis: 30000,
});

export const db = drizzle(pool);
