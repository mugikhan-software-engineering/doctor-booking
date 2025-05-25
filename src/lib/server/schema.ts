import { integer, pgTable, varchar, timestamp, boolean, text, date, time, index, pgEnum } from "drizzle-orm/pg-core";

export const patientTypeEnum = pgEnum('patient_type', ['new', 'existing']);

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  phoneNumber: varchar({ length: 20 }),
  address: text(),
  medicalHistory: text(),
  emergencyContact: text(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const appointmentsTable = pgTable("appointments", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer().references(() => usersTable.id).notNull(),
  date: date().notNull(),
  time: time().notNull(), // Stores time in HH:MM:SS format
  status: varchar({ length: 20 }).notNull().default("scheduled"), // scheduled, completed, cancelled
  patientType: patientTypeEnum().notNull().default('new'),
  hasReferral: boolean().notNull().default(false),
  referringDoctor: varchar({ length: 255 }),
  hasMedicalAuth: boolean().notNull().default(false),
  notes: text(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
}, (t) => [
  index("appointment_date_idx").on(t.date),
  index("appointment_user_idx").on(t.userId),
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
