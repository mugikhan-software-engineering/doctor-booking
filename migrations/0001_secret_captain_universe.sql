ALTER TABLE "appointments" RENAME COLUMN "contactNumber" TO "contact_number";--> statement-breakpoint
ALTER TABLE "appointments" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "appointments" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "availability" RENAME COLUMN "isAvailable" TO "is_available";--> statement-breakpoint
ALTER TABLE "availability" RENAME COLUMN "startTime" TO "start_time";--> statement-breakpoint
ALTER TABLE "availability" RENAME COLUMN "endTime" TO "end_time";--> statement-breakpoint
ALTER TABLE "availability" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "availability" RENAME COLUMN "updatedAt" TO "updated_at";