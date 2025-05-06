import { drizzle } from "drizzle-orm/postgres-js";
import { Resource } from "sst";
import postgres from "postgres";

const client = postgres({
  password: Resource.Database.password,
  user: Resource.Database.user,
  port: Resource.Database.port,
  host: Resource.Database.host,
  db: Resource.Database.database,
});

export const db = drizzle(client, {
  casing: "snake_case",
});