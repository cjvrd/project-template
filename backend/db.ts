import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { DB } from "./types";

const dbHost = process.env.DB_HOST ?? "db";
const dbPortRaw = Number(process.env.DB_PORT ?? 5432);
const dbPort = Number.isFinite(dbPortRaw) ? dbPortRaw : 5432;
const dbName = process.env.DB_NAME ?? "postgres";
const dbUser = process.env.DB_USER ?? "postgres";
const dbPassword = process.env.DB_PASSWORD ?? "postgres";

const dialect = new PostgresDialect({
  pool: new Pool({
    database: dbName,
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    port: dbPort,
    max: 10,
  }),
});

export const db = new Kysely<DB>({
  dialect,
});
