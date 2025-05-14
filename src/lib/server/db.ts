import { drizzle } from "drizzle-orm/postgres-js";
import { Resource } from "sst";
import postgres from "postgres";
import { appointmentsTable, availabilityTable, usersTable } from "./schema";

const client = postgres({
  password: Resource.Database.password,
  user: Resource.Database.user,
  port: Resource.Database.port,
  host: Resource.Database.host,
  db: Resource.Database.database,
});

export const db = drizzle(client, {
    schema: {
        appointments: appointmentsTable,
        availability: availabilityTable,
        users: usersTable
    },
    casing: "snake_case",
});