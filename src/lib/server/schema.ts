import { integer, pgTable, varchar, timestamp, boolean, text, date, time, index } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const appointmentsTable = pgTable("appointments", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  contactNumber: varchar({ length: 20 }).notNull(),
  date: date().notNull(),
  time: time().notNull(), // Stores time in HH:MM:SS format
  status: varchar({ length: 20 }).notNull().default("scheduled"), // scheduled, completed, cancelled
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
}, (t) => [
  index("appointment_date_idx").on(t.date),
]);

export const availabilityTable = pgTable("availability", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  date: date().notNull(),
  isAvailable: boolean().notNull().default(true),
  reason: text(),
  startTime: time(), // Stores time in HH:MM:SS format
  endTime: time(), // Stores time in HH:MM:SS format
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
}, (t) => [
  index("availability_date_idx").on(t.date),
]);
